const { authenticatedRequest, request } = require('./agent'); 

jest.mock('../../src/services/user-service');

beforeEach(() => {
  jest.clearAllMocks();
  jest.resetAllMocks();
  jest.resetModules();
  jest.restoreAllMocks();
});

test('Should raise INVALID token error', (done) => {
  const jwt = require('jsonwebtoken');
  jwt.verify = () => { throw new Error('JWT verification error') };

  authenticatedRequest
    .post('/users/login')
    .send({ email: "user@example.com", password: "password" })
    .expect('Content-Type', /json/)
    .expect({ message: 'Invalid Token.' })
    .expect(401, done);
});

test('Should raise REQUIRED token error', (done) => {
  request
    .post('/users/login')
    .send({ email: "user@example.com", password: "password" })
    .expect('Content-Type', /json/)
    .expect({ message: 'A token is required for authentication.' })
    .expect(403, done);
});

test('Should server raise apir error', (done) => {
  authenticatedRequest
    .post('/users/register')
    .send({ first_name: 'api_error', last_name: "Santos", email: "vanilsson@example.com", password: "password" })
    .expect('Content-Type', /json/)
    .expect({ message: 'Api error' })
    .expect(409, done);
});

test('Should register user raise internal server error', (done) => {
  authenticatedRequest
    .post('/users/register')
    .send({ first_name: 'internal_error', last_name: "Santos", email: "vanilsson@example.com", password: "password" })
    .expect('Content-Type', /json/)
    .expect({ message: 'Internal server error' })
    .expect(500, done);
});

test('Should register user, raise BAD authenticatedRequest 422 if required parameters are missing', (done) => {
  authenticatedRequest
    .post('/users/register')
    .send({ last_name: "Santos", email: "vanilsson@example.com", password: "password" })
    .expect('Content-Type', /json/)
    .expect({ error: '"first_name" is required' })
    .expect(422, done);
});
  
test('Should register user', (done) => {
  authenticatedRequest
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

test('Should login, raise BAD authenticatedRequest 422 if required parameters are missing', (done) => {
  authenticatedRequest
    .post('/users/login')
    .send({ email: "vanilsson@example.com" })
    .expect('Content-Type', /json/)
    .expect({ error: '"password" is required' })
    .expect(422, done);
});

test('Should login', (done) => {
  authenticatedRequest
    .post('/users/login')
    .send({ email: "vanilsson@example.com", password: "password" })
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

test('Should login raise internal server error', (done) => {
  authenticatedRequest
    .post('/users/login')
    .send({ email: "internal_error@example.com", password: "password" })
    .expect('Content-Type', /json/)
    .expect({ message: 'Internal server error' })
    .expect(500, done);
});