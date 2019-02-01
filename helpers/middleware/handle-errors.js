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
    res.status(409).json({
      error: 'Conflict in DB'
    });
  } else {
    res.status(500).json({
      error: 'Unknown server error'
    });
  }
};
