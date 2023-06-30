class ApiError extends Error {
  constructor(data) {
    super(data.message);
    this.name = "ApiError";
    this.status = data.status;
    this.message = data.message;
  }
}

module.exports = ApiError;
