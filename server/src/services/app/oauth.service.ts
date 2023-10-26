import { configs } from '@/configs';
import { UserModel } from '@/models';
import passportGoogle = require('passport-google-oauth20');
import { createAuthCookie, generateAuthTokens } from '../helpers';
import { sterilizeUser } from '@/helpers';
import passport = require('passport');
import { InternalServerErrorException } from '@dolphjs/dolph/common';
import { store } from '@/utils';

export const googleOauth = () => {
  const googleStrategy = new passportGoogle.Strategy(
    {
      ...configs.google,
      scope: ['email', 'profile'],
    },
    async (_request, accessToken, _refreshToken, profile, done) => {
      const user = await UserModel.findOne({ email: profile.emails[0].value });
      if (store.intent === 'login') {
        if (!user) return done('user does not exists, try signing up');

        if (user.authType === 'login') {
          console.log('OK-====================');
          return done(new Error('account was not registered with google oauth, please login with normal login'), null);
        }
        console.log('Reached');

        const tokens = await generateAuthTokens(user._id);
        const cookie = await createAuthCookie(user._id);
        console.log(cookie);
        return done(null, { user: sterilizeUser(user), cookie, tokens });
      } else if (store.intent === 'signup') {
        if (user && user.authType === 'google') return done(new Error('user already exists, try loging in'), null);
        if (user && user.authType === 'login') return done(new Error('user already exists, try loging in with email'), null);

        const newUser = {
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          email: profile.emails[0].value,
          pics: profile.photos[0].value,
          authType: 'google',
          emailVerified: true,
        };

        const userProfile = await UserModel.create(newUser);

        if (!userProfile) return done(new Error('an error occured: cannot proceed with signup'), null);

        const tokens = await generateAuthTokens(userProfile._id);
        const cookie = await createAuthCookie(userProfile._id);
        console.log(cookie);
        return done(null, { user: sterilizeUser(userProfile), cookie, tokens });
      } else {
        return done(new Error('an error occured: wrong or invalid intent sent'), null);
      }
    },
  );
  passport.use(googleStrategy);
};
