const { __PROD__ } = require('../utils')

errorMiddleware = (error, request, response, next) =>
{
  if(response.headerSent)
  {
    next(error)
  }
  else
  {
    response.status(500)
    response.json({
      message: error.message,
      ...__PROD__(__PROD__ ? null : { stack: error.stack })
    })
  }
}

module.exports = errorMiddleware
