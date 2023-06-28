const request = require('supertest');

jest.mock('../../src/services/user-service');

beforeEach(() => {
  jest.clearAllMocks();
  jest.resetAllMocks();
  jest.resetModules();
  jest.restoreAllMocks();
});

test('Should server raise apir error', (done) => {
  request(require('../../src/app'))
    .post('/users/register')
    .send({ first_name: 'api_error', last_name: "Santos", email: "vanilsson@example.com", password: "password" })
    .expect('Content-Type', /json/)
    .expect({ message: 'Api error' })
    .expect(409, done);
});

test('Should server raise internal server error', (done) => {
  request(require('../../src/app'))
    .post('/users/register')
    .send({ first_name: 'internal_error', last_name: "Santos", email: "vanilsson@example.com", password: "password" })
    .expect('Content-Type', /json/)
    .expect({ message: 'Internal server error' })
    .expect(500, done);
});

test('Should register user, raise BAD REQUEST 422 if required parameters are missing', (done) => {
  request(require('../../src/app'))
    .post('/users/register')
    .send({ last_name: "Santos", email: "vanilsson@example.com", password: "password" })
    .expect('Content-Type', /json/)
    .expect({ error: '"first_name" is required' })
    .expect(422, done);
});
  
test('Should register user', (done) => {
  request(require('../../src/app'))
    .post('/users/register')
    .send({ first_name: 'Vanilson', last_name: "Santos", email: "vanilsson@example.com", password: "password" })
    .expect('Content-Type', /json/)
    .expect({
      first_name: "Vanilson",
      last_name: "Santos",
      email: "vanilssonw@example.com",
      password: "password",
      _id: "649cb0180e8537a384020260",
      __v: 0,
      token: "token"
    })
    .expect(200, done);
});