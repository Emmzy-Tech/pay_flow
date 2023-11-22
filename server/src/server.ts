import { DolphFactory } from '@dolphjs/dolph';
import routes from './routes';
import { Strategy as JWTStrategy } from 'passport-jwt';
import passport = require('passport');
import { initPassport } from './services/helpers/init_passport.service';
import { googleOauth } from './services/app/oauth.service';
import expressSession = require('express-session');
import { configs } from './configs';
import { jwtOptions, jwtVerify } from './helpers';
import { createServer } from 'http';
import { logger } from '@dolphjs/dolph/utilities';
import { getIo } from './services/sockets.service';

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
  (req, res, next) => {
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, authorization');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
  },
]);

// dolph.enableCors();

const httpServer = createServer(dolph.engine);
getIo(httpServer);

// dolph.engine().use();

initPassport();
googleOauth();

httpServer.listen(3100, () => {
  logger.info('socket.io server is running');
});
dolph.start();
