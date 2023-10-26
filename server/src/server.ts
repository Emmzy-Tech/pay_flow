import { DolphFactory } from '@dolphjs/dolph';
import routes from './routes';
import passport = require('passport');
import { initPassport } from './services/helpers/init_passport.service';
import { googleOauth } from './services/app/oauth.service';
import expressSession = require('express-session');
import { configs } from './configs';

const dolph = new DolphFactory(routes, [
  expressSession({
    secret: configs.jwt.secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: new Date(new Date().getTime() + 1000 * 60 * 30).getMilliseconds(),
      secure: false,
      httpOnly: false,
    },
  }),
  passport.initialize(),
]);

initPassport();
googleOauth();

dolph.start();
