import Joi = require('joi');

export const sendOtp = {
  params: Joi.object().keys({
    email: Joi.string().required().email(),
  }),
};
