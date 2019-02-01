/*
  This is a middleware module that will process requests after
  the router has processed them. If one of the controllers
  of the router calls next with an error, next(error), this
  function will catch and process that error.
*/
module.exports = (error, req, res, next) => {
  if (error.status) {
    // If the error has a status, it was created by http-errors module
    res.status(error.status).json({
      error: error.message
    });
  } else if (error.code === 'ER_DUP_ENTRY') {
    /*
      When an error happens in one of the models, the error will be
      thrown by pool.query(), and caught by whatever controller called it.
      In our controllers, we have a try/catch block to catch errors thrown
      by our models (or other failing code), and then the error is passed
      to next(), forwarding it to this function.
      Errors thrown by MySQL have a "code" property which we can use to tell
      what kind of error it is. In this case, whenever a duplicate entry
      happens in the database, MySQL will throw an ER_DUP_ENTRY error, and
      we will respond with a status 409.
    */
    res.status(409).json({
      error: 'Conflict in DB'
    });
  } else {
    res.status(500).json({
      error: 'Unknown server error'
    });
  }
};
