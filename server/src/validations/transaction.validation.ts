import Joi from 'joi';

export const payEmployee = {
  body: Joi.object().keys({
    amount: Joi.number().required(),
    employeeId: Joi.string().required(),
  }),
};
