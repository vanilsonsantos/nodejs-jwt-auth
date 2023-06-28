const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ApiError = require('../middleware/apiError');

const register = async (data) => {
  const existingUser = await User.findOne({ email: data.email });
  if (existingUser) throw new ApiError({ status: 409, message: "User is already created." });

  const encryptedPassword = await bcrypt.hash(data.password, 10);
  const user = await User.create({
    first_name: data.first_name,
    last_name: data.last_name,
    email: data.email.toLowerCase(),
    password: encryptedPassword,
  });

  const token = jwt.sign(
    { user_id: user._id.toString(), email: user.email },
    process.env.TOKEN_KEY,
    {
      expiresIn: process.env.TOKEN_EXPIRATION_TIME,
    }
  );
  return {...user.toJSON(),...{token}};
};

module.exports = {
  register    
}