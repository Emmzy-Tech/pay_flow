import { ErrorException } from '@dolphjs/dolph/common';
import { config } from 'dotenv';
import Joi = require('joi');
config({});

const envSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().description('current app environemt').default('development'),
    CLOUDINARY_NAME: Joi.string().required().description('the name of cloudinary folder'),
    CLOUDINARY_API_KEY: Joi.string().required().description('cloudinary api key'),
    CLOUDINARY_SECRET_KEY: Joi.string().required().description('cloudinary secret key'),
    JWT_SECRET: Joi.string().default('2hang-JWT-2hang-SECRET').description('JWT secret key'),
    JWT_ACCESS_EXPIRATION: Joi.number().default(10000).description('seconds after which access tokens expire'),
    JWT_REFRESH_EXPIRATION: Joi.number().description('seconds after which refresh token expires'),
    SMTP_PASSWORD: Joi.string().required().description('application smtp password'),
    SMTP_USERNAME: Joi.string().description('applications smtp gmail').required(),
    OTP_EXPIRATION: Joi.string().description('otp expiration').default(3600),
    GOOGLE_CLIENT_ID: Joi.string().required().description('google client id'),
    GOOGLE_CLIENT_SECRET: Joi.string().required().description('google client secret'),
    GOOGLE_CALLBACK_URL: Joi.string().required().description('google callback url'),
    OPAY_SECRET_KEY: Joi.string().required().description('opay merchant secret key'),
    OPAY_PUBLIC_KEY: Joi.string().required().description('opay merchant public key'),
    OPAY_MERCHANT_ID: Joi.string().required().description("opay merchant's id"),
  })
  .unknown();

const { value: envVars, error } = envSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) throw new ErrorException(500, `Configs Load error: ${error.message}`);

export const configs = {
  env: envVars.NODE_ENV,
  cloudinary: {
    name: envVars.CLOUDINARY_NAME,
    api_key: envVars.CLOUDINARY_API_KEY,
    api_secret: envVars.CLOUDINARY_SECRET_KEY,
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    expires: envVars.JWT_ACCESS_EXPIRATION,
    refresh_expires: envVars.JWT_REFRESH_EXPIRATION,
  },
  smtp: {
    user: envVars.SMTP_USERNAME,
    pass: envVars.SMTP_PASSWORD,
  },
  otp: {
    expires: envVars.OTP_EXPIRATION,
  },
  google: {
    clientID: envVars.GOOGLE_CLIENT_ID,
    clientSecret: envVars.GOOGLE_CLIENT_SECRET,
    callbackURL: envVars.GOOGLE_CALLBACK_URL,
  },
  opay: {
    secret: envVars.OPAY_SECRET_KEY,
    publicKey: envVars.OPAY_PUBLIC_KEY,
    id: envVars.OPAY_MERCHANT_ID,
  },
  squad: {
    testKey: envVars.SQUAD_TEST_KEY,
    privateKey: envVars.SQUAD_PRIVATE_KEY,
    publicKey: envVars.SQUAD_PUBLIC_KEY,
    merchantId: envVars.SQUAD_MERCHANT_ID,
    testMerchantId: envVars.SQUAD_TEST_MERCHANT_ID,
  },
};
