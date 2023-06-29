const Joi = require('joi');

const schemas = {
  userRegister: Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
  userLogin: Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  })
};

module.exports = schemas;
