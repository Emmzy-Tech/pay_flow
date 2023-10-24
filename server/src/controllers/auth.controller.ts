import { AppServices } from '@/services/app';
import { DolphControllerHandler } from '@dolphjs/dolph/classes';
import { BadRequestException, Dolph, SuccessResponse, TryCatchAsyncDec } from '@dolphjs/dolph/common';
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

      // TODO: send mail here
    } else {
      if (!user) {
        const newUser = await services.userService.create({ email: req.params.email });
        otp = await newUser.generateOtp();
        // TODO: send mail here
      } else {
        // means user exists but did not receive otp so:
        otp = await user.generateOtp();
        // TODO: send mail here
      }
    }

    console.info(otp);

    SuccessResponse({ res, body: { status: 'success', msg: 'otp sent' } });
  }
}
