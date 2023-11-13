import passport = require('passport');

export const initPassport = () => {
  passport.serializeUser((user, done) => {
    console.log(user);
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    console.log(user);
    done(null, user);
  });
};
