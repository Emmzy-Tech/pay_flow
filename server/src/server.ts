import { DolphFactory } from '@dolphjs/dolph';
import routes from './routes';
import { Strategy as JWTStrategy } from 'passport-jwt';
import passport = require('passport');
import { initPassport } from './services/helpers/init_passport.service';
import { googleOauth } from './services/app/oauth.service';
import expressSession = require('express-session');
import { configs } from './configs';
import tooBusy = require('toobusy-js');
import { ErrorResponse, HttpStatus } from '@dolphjs/dolph/common';
import { jwtOptions, jwtVerify } from './helpers';

const cookieAge = new Date(new Date().getTime() + 1000 * 60 * 30).getMilliseconds();

passport.use(new JWTStrategy(jwtOptions, jwtVerify));

const dolph = new DolphFactory(routes, [
  expressSession({
    secret: configs.jwt.secret,
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: cookieAge,
      secure: false,
      httpOnly: false,
    },
  }),
  passport.initialize(),
  passport.session(),
]);

dolph.engine().use((req, res, next) => {
  if (tooBusy()) {
    next(
      ErrorResponse({
        res,
        body: { msg: 'server is busy at the moment. try again later' },
        status: HttpStatus.SERVICE_UNAVAILABLE,
      }),
    );
  }
  next();
});

initPassport();
googleOauth();

dolph.start();
