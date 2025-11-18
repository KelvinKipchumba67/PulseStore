// This utility wraps async route handlers to catch errors
// and pass them to our global error handler,
// removing the need for try...catch blocks in every controller.
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;