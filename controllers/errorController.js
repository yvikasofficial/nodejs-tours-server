module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  //Operational, trusted error : end message to the client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
  //Programming or other unknown error : don't leak error details
  else {
    //1) Log Error
    console.error('Error', err);

    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};
