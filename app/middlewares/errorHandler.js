const errorHandler = (error, req, res, next) => {
  if (error.name === "ValidationError") {
    let errorFields = {};
    Object.keys(error.errors).forEach(
      (key) =>
        (errorFields = {
          ...errorFields,
          [key]: String(error.errors[key].message).toLowerCase(),
        })
    );
    return res.status(400).json({
      message: errorFields,
      error,
    });
  }
  if (error.name === "CastError") {
    return res.status(error.statusCode).json({
      message: "silahkan masukan id yang valid",
      error,
    });
  }
  if (error.name === "TokenExpiredError") {
    error.message = "token kadaluarsa";
    return res.status(401).json({
      message: error.message,
      error,
    });
  }
  return res.status(error.statusCode ?? 500).json({
    message: String(error.message ?? "Internal server error").toLowerCase(),
    error,
  });
};

module.exports = errorHandler;
