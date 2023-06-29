
const ApiError = require('../../middleware/apiError');

const register = async (data) => {
  if (data.first_name == 'internal_error') throw new Error('Internal error');
  if (data.first_name == 'api_error') throw new ApiError({ status: 409, message: 'Api error'});
  return {
    first_name: "Vanilson",
    last_name: "Santos",
    email: "vanilssonw@example.com",
    password: "password",
    _id: "649cb0180e8537a384020260",
    __v: 0,
    token: "token"
  }
};

const login = async (data) => {
  if (data.email == 'internal_error@example.com') throw new Error('Internal error');
  return {
    first_name: "Vanilson",
    last_name: "Santos",
    email: "vanilssonw@example.com",
    password: "password",
    _id: "649cb0180e8537a384020260",
    __v: 0,
    token: "token"
  }
}

module.exports = {
  register,
  login
}