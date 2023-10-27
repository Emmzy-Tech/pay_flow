import Joi = require('joi');
import { password } from './utils/custom.validation';

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

export const login = {
  body: Joi.object().keys({
    email: Joi.string().required().trim(),
    password: Joi.string().min(6).max(30).required().custom(password),
  }),
};

export const refreshTokens = {
  params: Joi.object().keys({
    token: Joi.string().required().trim(),
  }),
};
