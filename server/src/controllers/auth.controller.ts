import { AppServices } from '@/services/app';
import { sendActivateAccountMail, sendOtpToUsersMail } from '@/services/mail/emails';
import { compareAndValidateStrings } from '@/utils';
import { DolphControllerHandler } from '@dolphjs/dolph/classes';
import {
  BadRequestException,
  Dolph,
  InternalServerErrorException,
  SuccessResponse,
  TryCatchAsyncDec,
} from '@dolphjs/dolph/common';
import { Request, Response } from 'express';

const services = new AppServices();

export class AuthController extends DolphControllerHandler<Dolph> {
  constructor() {
    super();
  }

  @TryCatchAsyncDec
  public async sendOtp(req: Request, res: Response) {
    const user = await services.userService.findByEmail(req.params.email);
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
        const newUser = await services.userService.create({ email: req.params.email });
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

    SuccessResponse({ res, body: { status: 'success', msg: 'emai verified successfully' } });
  }
}
