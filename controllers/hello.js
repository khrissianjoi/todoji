/*
  This code processes and formats data
  And talks to the models

  -> Take in and process request body, querystring, etc
  -> Call the models to get some data from the DB
  -> Format and send that data back as a response
*/
module.exports = (req, res) => {
  res.send('Hello');
};
