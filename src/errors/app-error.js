class AppError extends Error {
  constructor(statusCode, errorCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = {
  AppError,
  notFound: (code, msg) => new AppError(404, code, msg || 'Resource not found.'),
  forbidden: (msg) => new AppError(403, 'FORBIDDEN', msg || 'Access denied.'),
  badRequest: (code, msg) => new AppError(400, code, msg || 'Bad request.'),
};