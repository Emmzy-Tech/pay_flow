import Joi = require('joi');

export const newEmployee = {
  body: Joi.object().keys({
    fullname: Joi.string().required(),
    accountNo: Joi.string().min(9).max(12).required(),
    bankName: Joi.string().required(),
    amount: Joi.string().required(),
    currency: Joi.string().required(),
    paymentFreq: Joi.string().required(),
  }),
};

export const updateEmployee = {
  body: Joi.object().keys({
    id: Joi.string().required(),
    fullname: Joi.string(),
    accountNo: Joi.string().min(9).max(12),
    bankName: Joi.string(),
    amount: Joi.string(),
    currency: Joi.string(),
    paymentFreq: Joi.string(),
  }),
};

export const getEmployeeById = {
  params: Joi.object().keys({
    if: Joi.string().required(),
  }),
};
