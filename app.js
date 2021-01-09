const express = require('express');
const morgan = require('morgan');

const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const AppError = require('./utils/appError');

const app = express();

if (process.env.NODE_ENV === 'developement') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  // const err = new Error(`Can't find ${req.originalUrl} in this server!`);
  // err.status = 'fail';
  // err.statusCode = 404;

  next(new AppError(`Can't find ${req.originalUrl} in this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
