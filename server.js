const express = require('express');
require('express-async-errors');
const app = express();
const mongoDb = require('./src/utils/mongodb');


const port = 3000;


app.use(express.json());
app.use('/', require('./src/routes'));

mongoDb.initDb((err, mongodb ) => {
  if (err) {
      console.log(err);
  } else {
      app.listen(process.env.PORT || port);   
      console.log('Web Server is listening at port ' + (process.env.PORT || port));
  }
});


app.use(function handleValidationError(err, req, res, next) {
  if (err instanceof ValidationError) {
    res.status(400);
    res.json({ error: err.message });
  }
  
  next(err);
});

app.use(function handleNotFoundError(err, req, res, next) {
  if (err instanceof NotFoundError) {
    res.status(404);
    res.json({
      httpStatus: HttpStatus.BAD_REQUEST,
      message: error.message,
      validationErrors: error.validationErrors
    });
  }
  
  next(err);
});

app.use(function handleDatabaseError(error, request, response, next) {
  if (error instanceof MongoError) {
    if (error.code === 11000) {
      return response
        .status(HttpStatus.CONFLICT)
        .json({
          httpStatus: HttpStatus.CONFLICT,
          type: 'MongoError',
          message: error.message
        });
    } else {
      return response.status(503).json({
        httpStatus: HttpStatus.SERVICE_UNAVAILABLE,
        type: 'MongoError',
        message: error.message
      });
    }
  }
  next(error);
});

  // production error handler
// no stacktraces leaked to user
app.use(function (error, req, res, next) {
  if (res.headersSent) {
    return next(error)
  } else {
    res.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    res.send({
      message: error.message,
      error: {}
    });
  }

});