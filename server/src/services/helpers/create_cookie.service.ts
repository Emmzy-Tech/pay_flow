import { configs } from '@/configs';
import { generateJWTwithHMAC, verifyJWTwithHMAC } from '@dolphjs/dolph/utilities';
import moment = require('moment');
import { TokenType } from '@models/types';
import { TokenModel } from '@/models/token.model';

export const generateToken = async (id: string) => {
  return generateJWTwithHMAC({
    payload: {
      exp: moment().add(configs.jwt.expires, 'seconds').unix(),
      iat: moment().unix(),
      sub: id,
    },
    secret: configs.jwt.secret,
  });
};

export const generateRefreshToken = async (id: string) => {
  return generateJWTwithHMAC({
    payload: {
      exp: moment().add(configs.jwt.refresh_expires, 'days').unix(),
      iat: moment().unix(),
      sub: id,
    },
    secret: configs.jwt.secret,
  });
};

export const saveToken = async (token: string, userId: string, expires: moment.Moment, type: typeof TokenType) => {
  return TokenModel.create({
    token,
    userId,
    expires: expires.toDate(),
    type,
  });
};

export const verifyToken = async (token: string, type: typeof TokenType) => {
  try {
    const payload = await verifyJWTwithHMAC({ token, secret: configs.jwt.secret });
    const tokenDoc = await TokenModel.findOne({ token, type, user: payload.sub });

    if (!tokenDoc) throw new Error('token not found');
    return tokenDoc;
  } catch (e) {
    throw e;
  }
};

export const generateAuthTokens = async (userId: string) => {
  const accessToken = await generateToken(userId);
  const refreshToken = await generateRefreshToken(userId);

  await saveToken(refreshToken, userId, moment().add(configs.jwt.refresh_expires, 'days'), 'refresh');

  return {
    access: {
      token: accessToken,
      expires: moment().add(configs.jwt.expires, 'seconds').toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: moment().add(configs.jwt.refresh_expires, 'days').toDate(),
    },
  };
};

export const createAuthCookie = async (id: string) => {
  const token = await generateAuthTokens(id);
  const options = {
    expires: new Date(new Date().getTime() + 1000 * 60 * 30),
    httpOnly: false,
    secure: false,
  };

  if (configs.env === 'production') {
    options.secure = true;
    options.httpOnly = true;
  }

  return {
    token: { access: token.access.token, refresh: token.refresh.token },
    options,
  };
};

export const destroyCookie = async () => {
  const options = {
    expires: new Date(0),
    httpOnly: true,
    secure: false,
  };

  return { options };
};
