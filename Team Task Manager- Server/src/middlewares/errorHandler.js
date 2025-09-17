export const errorHandler = (err, req, res, next) => {
  console.err(err);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
  next();
};
