import Joi from 'joi';

export const getNotifications = {
  query: Joi.object({
    limit: Joi.string().required(),
    page: Joi.string().required(),
    query: Joi.string(),
  }),
};
