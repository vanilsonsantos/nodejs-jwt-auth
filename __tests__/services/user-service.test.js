
jest.mock('../../src/models/user');

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
    expect(error.message).toBe("User is already created.");
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
  
  //when
  const { register } = require('../../src/services/user-service');
  const user = await register(userData); 

  //then
}); 