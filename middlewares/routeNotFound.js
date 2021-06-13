const routeNotFound = (req, res) => {
  res.status(404).json({
    success: "fail",
    message: "route not found on server, please check!",
  });
};

module.exports = { routeNotFound };
