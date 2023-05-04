class CustomAPIError extends Error {
  constructor(message, statusCode = 0) {
    super(message);
    this.statusCode = statusCode
  }
}

module.exports = CustomAPIError
