import { AuthController } from '@/controllers/auth.controller';
import { store } from '@/utils';
import { logout, refreshTokens, sendOtp, verifyOtp } from '@/validations';
import { DolphRouteHandler } from '@dolphjs/dolph/classes';
import { Dolph, reqValidatorMiddleware } from '@dolphjs/dolph/common';
import { NextFunction, Request, Response } from 'express';
import passport = require('passport');

export class AuthRouter extends DolphRouteHandler<Dolph> {
  constructor() {
    super();
    this.initRoutes();
  }

  controller: AuthController = new AuthController();

  path: string = '/v1/auth';

  initRoutes(): void {
    this.router.get(`${this.path}/otp/:email`, reqValidatorMiddleware(sendOtp), this.controller.sendOtp);
    this.router.post(`${this.path}/verify-otp`, reqValidatorMiddleware(verifyOtp), this.controller.verifyOtp);
    this.router.post(`${this.path}/logout`, reqValidatorMiddleware(logout), this.controller.logout);
    this.router.get(`${this.path}/refresh-tokens`, reqValidatorMiddleware(refreshTokens), this.controller.refreshTokens);

    // ===============================OAUTH===================================
    this.router.get(`${this.path}/signup/google-web`, (req: Request, res: Response) => {
      passport.authenticate('google', { scope: ['profile', 'email'], state: JSON.stringify({ intent: 'signup' }) })(
        req,
        res,
      );
    });
    this.router.get(`${this.path}/login/google-web`, (req: Request, res: Response) => {
      passport.authenticate('google', { scope: ['profile', 'email'], state: JSON.stringify({ intent: 'login' }) })(req, res);
    });
    this.router.get(`${this.path}/google-web/callback`, (req: Request, res: Response, next: NextFunction) => {
      //@ts-expect-error
      const intent = req.query.state ? JSON.parse(req.query.state).intent : null;
      store.intent = intent;
      passport.authenticate('google', {
        successRedirect: 'http://localhost:3300/v1/auth/oauth/success',
        failureRedirect: 'http://localhost:3300/v1/auth/oauth/failure',
      })(req, res, next);
    });

    this.router.get(`${this.path}/oauth/success`, (req: Request, res: Response) => {
      res.status(200).json({ msg: 'successfully signup', status: 'success', tokens: req.cookies });
    });
    this.router.get(`${this.path}/oauth/failure`, (req: Request, res: Response) => {
      res.status(401).send('an error occured while trying to authenticate your account');
    });
  }
}
