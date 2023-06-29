const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ApiError = require('../middleware/apiError');
const ERRORS = require('../constants/api-errors');

const getUserWithToken = (user) => {
  const token = jwt.sign(
    { user_id: user._id, email: user.email },
    process.env.TOKEN_KEY,
    {
      expiresIn: process.env.TOKEN_EXPIRATION_TIME,
    }
  );
  return {...user,...{ token }};
};

const register = async (data) => {
  const existingUser = await User.findOne({ email: data.email });
  if (existingUser) throw new ApiError({ status: 409, message: ERRORS.USER_ALREADY_EXIST });

  const encryptedPassword = await bcrypt.hash(data.password, 10);
  console.log('encryptedPassword', encryptedPassword)
  console.log('data.email', data.email)
  const user = await User.create({
    first_name: data.first_name,
    last_name: data.last_name,
    email: data.email.toLowerCase(),
    password: encryptedPassword,
  });

  return getUserWithToken(user.toJSON());
};

const validateUser = async (user, inputPassword) => {
  if (!user || !(await bcrypt.compare(inputPassword, user.password))) throw new ApiError({ status: 400, message: ERRORS.INVALID_CREDENTIALS });
}

const login = async (data) => {
  const user = await User.findOne({ email: data.email });
  await validateUser(user, data.password);
  return getUserWithToken(user.toJSON());
};

module.exports = {
  register,
  login    
};