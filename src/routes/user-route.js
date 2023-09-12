const { Router } = require('express');
const router = Router();
const usersController = require('../controllers/users-controller');
const userSchema = require('../schemas/user-schema');
const validateSchema = require('../middleware/validate-schema');
 

router.post('/register', validateSchema(userSchema.userRegister, 'body'), usersController.register);
router.post('/login', validateSchema(userSchema.userLogin, 'body'), usersController.login);
router.post('/', usersController.healthCheck);

module.exports = {
  base: '/users',
  router
}
