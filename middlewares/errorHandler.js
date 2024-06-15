// const errorHandler = (err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).json({ message: 'Internal Server Error' });
//   };
  
//   export default errorHandler;

import winston from 'winston';

const logger = winston.createLogger({
  level: 'error',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'errors.log' }),
    new winston.transports.Console()
  ],
});

const errorHandler = (err, req, res, next) => {
  logger.error({
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip
  });

  let statusCode = 500;
  let responseMessage = 'Internal Server Error';

  switch (err.name) {
    case 'ValidationError':
      statusCode = 400;
      responseMessage = 'Validation Error';
      break;
    case 'UnauthorizedError':
      statusCode = 401;
      responseMessage = 'Unauthorized';
      break;
    case 'ForbiddenError':
      statusCode = 403;
      responseMessage = 'Forbidden';
      break;
    case 'NotFoundError':
      statusCode = 404;
      responseMessage = 'Resource Not Found';
      break;
    default:
      break;
  }

  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message: responseMessage,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
  next();
};

export default errorHandler;
