
const jwt = require("jsonwebtoken");
const CONSTANTS = require('../constants/api-errors');

const verifyAuthentication = (req, res, next) => {
  const token = req.headers["x-access-token"];
  console.log('token', token)
  if (!token || token == null) {
    return res.status(403).send({ message: CONSTANTS.TOKEN_REQUIRED });
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send({ message: CONSTANTS.INVALID_TOKEN });
  }
  return next();
};

module.exports = verifyAuthentication

