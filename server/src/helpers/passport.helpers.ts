import { configs } from '@/configs';

export const jwtOptions = {
  secretOrKey: configs.jwt.secret,
  jwtFromRequest: (req) => {
    let token = null;
    if (req & req.cookies) {
      token = req.cookies['xAuthToken'];
    }
    return token;
  },
};

export const jwtVerify = async (payload, done) => {
  console.log(payload, 'here');
  try {
    if (!payload) {
      return done(null, false);
    }
    done(null, payload);
  } catch (error) {
    done(error, false);
  }
};
