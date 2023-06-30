const ApiError = require('./api-error');

const errorResponse = (error, request, response, next) => {
  response.header('Content-Type', 'application/json');
  if (error.name == ApiError.name) {
    response.status(error.status).send({ message: error.message });
  } else {
    response.status(500).send({ message: 'Internal server error' });
  }
};

module.exports = errorResponse

