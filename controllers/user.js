/*
  This code processes and formats data
  And talks to the models

  -> Take in and process request body, querystring, etc
  -> Call the models to get some data from the DB
  -> Format and send that data back as a response
*/
const http_errors = require('http-errors');
const post_user_schema = require('../helpers/validators/post-user');
const user_model = require('../models/user');

module.exports = {
  async createUser(req, res, next) {
    try {
      const schema_errors = post_user_schema(req.body);
      if (schema_errors) {
        throw http_errors(404, schema_errors);
      }
      await user_model.createUser(req.body);
      res.end();
    } catch (error) {
      next(error);
    }
  }
};
