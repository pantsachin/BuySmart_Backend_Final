const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: "fail",
    error: err.message,
    message: "error occurred, see the error message key for more details",
  });
};

module.exports = { errorHandler };
