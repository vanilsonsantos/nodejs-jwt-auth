const supertest = require('supertest');

const headerToken = {name:'x-access-token', value:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'};

const hook = (method = 'post', headers = []) => (args) => {
  const agent =supertest(require('../../src/app'))
    [method](args)
  headers.forEach((header) => { agent.set(header.name, header.value) });
  return agent;
}

const request = {
  post: hook('post'),
  get: hook('get'),
  put: hook('put'),
  delete: hook('delete'),
};

const authenticatedRequest = {
  post: hook('post', [headerToken]),
  get: hook('get', [headerToken]),
  put: hook('put'),
  delete: hook('delete'),
};
    
module.exports = {
  authenticatedRequest,
  request
};