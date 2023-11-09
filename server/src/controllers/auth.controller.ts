import { sterilizeUser } from '@/helpers';
import { user } from '@/models/constants/collection_names.models';
import { AppServices } from '@/services/app';
import { generateAuthTokens, logout, verifyToken } from '@/services/helpers';
import { sendActivateAccountMail, sendOtpToUsersMail } from '@/services/mail/emails';
import { compareAndValidateStrings } from '@/utils';
import { DolphControllerHandler } from '@dolphjs/dolph/classes';
import {
  BadRequestException,
  Dolph,
  InternalServerErrorException,
  SuccessResponse,
  TryCatchAsyncDec,
  UnauthorizedException,
} from '@dolphjs/dolph/common';
import { hashWithBcrypt } from '@dolphjs/dolph/utilities';
import { Request, Response } from 'express';

const services = new AppServices();

export class AuthController extends DolphControllerHandler<Dolph> {
  constructor() {
    super();
  }

  @TryCatchAsyncDec
  public async sendOtp(req: Request, res: Response) {
    const user = await services.userService.findByEmail(req.body.email);
    const emailTaken = 'an account with this email aready exists, try logging in';

    if (user && user.firstName) return new BadRequestException(emailTaken);

    let otp = '';

    // if user did not complete registration send activate account email

    if (user && user.emailVerified) {
      otp = await user.generateOtp();
      user.emailVerified = false;
      await user.save();

      await sendActivateAccountMail(user.email, otp);
    } else {
      if (!user) {
        const newUser = await services.userService.create({
          email: req.body.email,
          password: await hashWithBcrypt({ pureString: req.body.password, salt: 11 }),
        });

        otp = await newUser.generateOtp();
        await sendOtpToUsersMail(newUser.email, otp);
      } else {
        // means user exists but did not receive otp so:
        otp = await user.generateOtp();
        await sendOtpToUsersMail(user.email, otp);
      }
    }

    console.info(otp);

    SuccessResponse({ res, body: { status: 'success', msg: 'otp sent' } });
  }

  @TryCatchAsyncDec
  public async verifyOtp(req: Request, res: Response) {
    const user = await services.userService.findByEmail(req.body.email);

    if (!user) throw new BadRequestException('user not found');
    const validateOtp = await compareAndValidateStrings(req.body.otp, user.otp, user.otpExpiry);

    if (!validateOtp) throw new BadRequestException('otp is not valid or has expired, request for another');

    user.otp = '';
    user.otpExpiry = new Date(0);
    user.emailVerified = true;

    if (!(await user.save())) throw new InternalServerErrorException('could not process request');

    const tokens = await generateAuthTokens(user._id);

    SuccessResponse({ res, body: { status: 'success', msg: 'emai verified successfully', data: tokens } });
  }

  @TryCatchAsyncDec
  public async logout(req: Request, res: Response) {
    if (!(await logout(req.body.token))) throw new InternalServerErrorException('cannot process request');
    SuccessResponse({ res, body: { msg: 'user has been logged out', status: 'success' } });
  }

  @TryCatchAsyncDec
  public async refreshTokens(req: Request, res: Response) {
    const refreshTokenDoc = await verifyToken(req.params.token, 'refresh');

    const user = await services.userService.findById(refreshTokenDoc.userId);

    if (!user) throw new BadRequestException('refresh token does not match that of any user');

    if (!(await refreshTokenDoc.remove())) throw new InternalServerErrorException('cannot process request');

    const authTokens = await generateAuthTokens(user._id);

    SuccessResponse({
      res,
      body: {
        data: { tokens: authTokens, user: sterilizeUser(user) },
        msg: 'auth tokens have been refreshed',
        status: 'success',
      },
    });
  }

  @TryCatchAsyncDec
  public async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await services.userService.findByEmail(email);

    if (!user) throw new BadRequestException('account not found, please input valid login credentials');
    if (user.authType === 'google')
      throw new BadRequestException(
        'these accout seemed to have been registered using google oauth. please use that to login',
      );

    if (!user.emailVerified) throw new UnauthorizedException('please verify your email to continue');

    if (!(await user.doesPasswordMatch(password)))
      throw new BadRequestException('invalid credentails. cross-check your login details and try again');

    const metrics = await services.transactionService.getmetrics();

    const tokens = await generateAuthTokens(user._id);
    SuccessResponse({ res, body: { tokens, user: sterilizeUser(user), metrics } });
  }
}
