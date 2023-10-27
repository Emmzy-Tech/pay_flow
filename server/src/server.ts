import { DolphFactory } from '@dolphjs/dolph';
import routes from './routes';
import passport = require('passport');
import { initPassport } from './services/helpers/init_passport.service';
import { googleOauth } from './services/app/oauth.service';
import expressSession = require('express-session');
import { configs } from './configs';
import tooBusy = require('toobusy-js');
import { ErrorResponse, HttpStatus } from '@dolphjs/dolph/common';

const cookieAge = new Date(new Date().getTime() + 1000 * 60 * 30).getMilliseconds();

const dolph = new DolphFactory(routes, [
  expressSession({
    secret: configs.jwt.secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: cookieAge,
      secure: false,
      httpOnly: false,
    },
  }),
  passport.initialize(),
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
