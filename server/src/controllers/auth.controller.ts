import { sterilizeUser } from '@/helpers';
import { user } from '@/models/constants/collection_names.models';
import { ITransactions } from '@/models/interfaces/transactions_interface.model';
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
  DRequest,
  DResponse,
  ErrorResponse,
} from '@dolphjs/dolph/common';
import { hashWithBcrypt } from '@dolphjs/dolph/utilities';

const services = new AppServices();

export class AuthController extends DolphControllerHandler<Dolph> {
  constructor() {
    super();
  }

  @TryCatchAsyncDec
  public async sendOtp(req: DRequest, res: DResponse) {
    const user = await services.userService.findByEmail(req.body.email);
    const emailTaken = 'an account with this email aready exists, try logging in';
    if (user && user.firstName) return ErrorResponse({ res, body: { message: emailTaken }, status: 400 });

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
  public async addPassword(req: DRequest, res: DResponse) {
    const user = await services.userService.findByEmail(req.body.email);

    if (!user) return ErrorResponse({ res, body: { message: 'user not found' }, status: 400 });

    user.password = await hashWithBcrypt({ pureString: req.body.password, salt: 11 });

    if (!(await user.save())) return ErrorResponse({ res, body: { message: 'cannot process request' }, status: 500 });

    SuccessResponse({ res, body: { status: 'success', msg: 'password set successfully' } });
  }

  @TryCatchAsyncDec
  public async verifyOtp(req: DRequest, res: DResponse) {
    const user = await services.userService.findByEmail(req.body.email);

    if (!user) return ErrorResponse({ res, body: { message: 'user not found' }, status: 400 });
    const validateOtp = await compareAndValidateStrings(req.body.otp, user.otp, user.otpExpiry);

    if (!validateOtp)
      return ErrorResponse({ res, body: { message: 'otp is not valid or has expired, request for another' }, status: 400 });

    user.otp = '';
    user.otpExpiry = new Date(0);
    user.emailVerified = true;

    if (!(await user.save())) return ErrorResponse({ res, body: { message: 'cannot process request' }, status: 500 });

    const metaData = {
      transactions: [],
      metrics: null,
      employeeCount: {},
    };

    metaData.metrics = await services.transactionService.getmetrics();

    const transactions = await services.transactionService.getTransactionHistory('');
    let count = 0;

    transactions.map((transaction: ITransactions) => {
      count += 1;
      if (count <= 10) {
        metaData.transactions.push(transaction);
      }
      return;
    });

    metaData.employeeCount = await services.userService.getEmployeeCount();

    const tokens = await generateAuthTokens(user._id);

    SuccessResponse({ res, body: { status: 'success', msg: 'emai verified successfully', data: tokens, metaData } });
  }

  @TryCatchAsyncDec
  public async logout(req: DRequest, res: DResponse) {
    if (!(await logout(req.body.token)))
      return ErrorResponse({ res, body: { message: 'cannot process request' }, status: 500 });
    SuccessResponse({ res, body: { msg: 'user has been logged out', status: 'success' } });
  }

  @TryCatchAsyncDec
  public async refreshTokens(req: DRequest, res: DResponse) {
    const refreshTokenDoc = await verifyToken(req.params.token, 'refresh');

    const user = await services.userService.findById(refreshTokenDoc.userId);

    if (!user)
      return ErrorResponse({ res, body: { message: 'refresh token does not match that of any user' }, status: 400 });

    if (!(await refreshTokenDoc.remove()))
      return ErrorResponse({ res, body: { message: 'cannot process request' }, status: 500 });

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
  public async login(req: DRequest, res: DResponse) {
    const { email, password } = req.body;

    const user = await services.userService.findByEmail(email);

    if (!user)
      return ErrorResponse({
        res,
        body: { message: "login credentials don't match, cross-check and try again" },
        status: 400,
      });
    if (user.authType === 'google')
      return ErrorResponse({
        res,
        body: { message: 'these accout seemed to have been registered using google oauth. please use that to login' },
        status: 400,
      });

    if (!user.emailVerified)
      return ErrorResponse({
        res,
        body: { message: 'please verify email to continue' },
        status: 401,
      });

    if (!(await user.doesPasswordMatch(password)))
      return ErrorResponse({
        res,
        body: { message: 'invalid credentails. cross-check your login details and try again' },
        status: 400,
      });

    const metaData = {
      transactions: [],
      metrics: null,
      employeeCount: {},
    };

    metaData.metrics = await services.transactionService.getmetrics();

    const transactions = await services.transactionService.getTransactionHistory('');
    let count = 0;

    transactions.map((transaction: ITransactions) => {
      count += 1;
      if (count <= 10) {
        metaData.transactions.push(transaction);
      }
      return;
    });

    metaData.employeeCount = await services.userService.getEmployeeCount();

    const tokens = await generateAuthTokens(user._id);
    SuccessResponse({
      res,
      body: { tokens, hrData: sterilizeUser(user), metaData },
    });
  }
}
