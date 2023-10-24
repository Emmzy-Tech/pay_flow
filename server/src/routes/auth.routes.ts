import { AuthController } from '@/controllers/auth.controller';
import { sendOtp } from '@/validations';
import { DolphRouteHandler } from '@dolphjs/dolph/classes';
import { Dolph, reqValidatorMiddleware } from '@dolphjs/dolph/common';

export class AuthRouter extends DolphRouteHandler<Dolph> {
  constructor() {
    super();
    this.initRoutes();
  }

  controller: AuthController = new AuthController();

  path: string = '/v1/auth';

  initRoutes(): void {
    this.router.get(`${this.path}/otp`, reqValidatorMiddleware(sendOtp), this.controller.sendOtp);
  }
}
