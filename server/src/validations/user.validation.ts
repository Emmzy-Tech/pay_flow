import Joi = require('joi');
import { password } from './utils/custom.validation';

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

export const updateUser = {
  body: Joi.object().keys({
    firstName: Joi.string(),
    lastName: Joi.string(),
    otherName: Joi.string(),
    position: Joi.string(),
  }),
};

export const getEmployeeById = {
  param: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

export const getEmployees = {
  query: Joi.object().keys({
    limit: Joi.number(),
    page: Joi.number(),
    keyword: Joi.string(),
    sortBy: Joi.string(),
    orderBy: Joi.string(),
  }),
};

export const confirmPassword = {
  param: Joi.object().keys({
    password: Joi.string().min(6).max(30).required().custom(password),
  }),
};

export const updatePassword = {
  body: Joi.object().keys({
    newPassword: Joi.string().min(6).max(30).required().custom(password),
    oldPassword: Joi.string().min(6).max(30).required().custom(password),
  }),
};
