const { Router } = require('express');
const router = Router();
const usersController = require('../controllers/users-controller');
const userSchema = require('../schemas/user-schema');
const validateSchema = require('../middleware/validate_schema');
 

router.post('/register', validateSchema(userSchema.registerUser, 'body'), usersController.register);

module.exports = {
  base: '/users',
  router
}