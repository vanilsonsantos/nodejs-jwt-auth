const userService = require('../services/user-service');

const register = async (req, res, next) => {
  try {
    const user = await userService.register(req.body);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const user = await userService.login(req.body);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

const healthCheck = async (req, res, next) => {
  try {
    res.json({ status: "Running" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  healthCheck,
  register,
  login
};
