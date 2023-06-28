const Joi = require('joi');

const schemas = {
  registerUser: Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
  })
};

module.exports = schemas;
