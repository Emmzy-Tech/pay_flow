import Joi = require('joi');

export const sendOtp = {
  params: Joi.object().keys({
    email: Joi.string().required().email(),
  }),
};

export const verifyOtp = {
  body: Joi.object().keys({
    otp: Joi.string().required().min(4).max(4).trim(),
    email: Joi.string().required().trim().email(),
  }),
};

export const logout = {
  body: Joi.object().keys({
    token: Joi.string().required().trim(),
  }),
};

export const refreshTokens = {
  params: Joi.object().keys({
    token: Joi.string().required().trim(),
  }),
};
