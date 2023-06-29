
jest.mock('../../src/models/user');
const bcrypt = require('bcryptjs');
const CONSTANTS = require('../../src/constants/api-errors');

beforeEach(() => {
  jest.clearAllMocks();
  jest.resetAllMocks();
  jest.resetModules();
  jest.restoreAllMocks();
});

test("Should register user, raise bad request if user is already created", async () => {
  //given
  const userData = {
    first_name: "user",
    email: "existing@user.com"
  };
  
  //when
  const { register } = require('../../src/services/user-service');
  try {
    const user = await register(userData); 
  } catch (error) {
    //then
    expect(error.status).toBe(409);
    expect(error.message).toBe(CONSTANTS.USER_ALREADY_EXIST);
  }

}); 

test("Should register user", async () => {
  //given
  const userData = {
    first_name: "user",
    last_name: "last_name",
    email: "new@user.com",
    password: "password"
  };
  const User = require('../../src/models/user');
  const jwt = require('jsonwebtoken')

  jest.spyOn(User, 'create');
  jest.spyOn(jwt, 'sign');
  
  //when
  const { register } = require('../../src/services/user-service');
  const user = await register(userData); 

  //then
  expect(User.create).toHaveBeenCalledWith({
    first_name: "user",
    last_name: "last_name",
    email: "new@user.com",
    password: expect.any(String)
  });
  expect(await bcrypt.compare(userData.password, user.password)).toBe(true);
  expect(jwt.sign).toHaveBeenCalledWith(
    {
      "email": "new@user.com",
       "user_id": "new_id",
    },
    "token_key",
    {"expiresIn": "2h"});
  expect(user.token).not.toBe(''); 
  
}); 

describe('Should login raise Invalid Credentials', () => {
  const cases = [
    [{ email: "INVALID_EMAIL@user.com", password: "password" } ],
    [{ email: "existing@user.com", password: "INVALID_PASSWORD" }],
  ];
  test.each(cases)('given %p , returns Invalid Credentials.', async (input) => {
    //when
    const { login } = require('../../src/services/user-service');
 
    try {
      await login(input);
    } catch (error) {
      //then
      expect(error.message).toBe(CONSTANTS.INVALID_CREDENTIALS)
    }
  });
});

test('Should login', async() => {
  //given
  const userData = {
    password: "password",
    email: "existing@user.com"
  };

  //when
  const { login } = require('../../src/services/user-service');
  const user = await login(userData);

  //then
  expect(await bcrypt.compare(userData.password, user.password)).toBe(true);
  expect(user.email).toBe(userData.email);
  expect(user.token).not.toBe("");
});