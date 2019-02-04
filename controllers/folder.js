const http_errors = require('http-errors');
const post_folder_schema = require('../helpers/validators/post-folder');
const folder_model = require('../models/folder')

module.exports = {
  async createFolder(req, res, next) {
    try {
      const schema_errors = post_folder_schema(req.body);
      if (schema_errors) {
        throw http_errors(400, schema_errors);
      }
      await folder_model.createFolder(req.body);
      res.status(200).end();
    } catch (error) {
      next(error);
    }
  },

  async getFolders(req, res, next) {
    try {
      const userId = parseInt(req.query.id, 10);
      console.log(userId);
      if (userId < 0) {
        throw http_errors(400, 'invalid user id');
      }
      const folders = await folder_model.getFolders(userId);
      res.json({items :folders}); 
    } catch (error) {
      next(error);
    }
  }
};