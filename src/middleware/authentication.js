
const jwt = require("jsonwebtoken");
const CONSTANTS = require('../constants/api-errors');

const verifyAuthentication = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (token) {
      try {
      const decoded = jwt.verify(token, process.env.TOKEN_KEY);
      req.user = decoded;
    } catch (err) {
      return res.status(401).send({ message: CONSTANTS.INVALID_TOKEN });
    }
    return next();
  }
};

module.exports = verifyAuthentication

