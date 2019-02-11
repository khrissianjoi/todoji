const http_errors = require('http-errors');
const post_task_schema = require('../helpers/validators/post-task');
// const patch_folder_schema = require('../helpers/validators/patch-files');
const task_model = require('../models/tasks');

module.exports = {
  async postTask(req, res, next) {
    try {
        const schema_errors = post_task_schema(req.body);
        if (schema_errors) {
            throw http_errors(400, schema_errors);
      }
      await task_model.createTask(req.body);
      res.status(200).end();
    } catch (error) {
        next(error);
    }
	},

  async getTasks(req, res, next) {
    try {
      const folderId = parseInt(req.query.id, 10);
      if (folderId < 0) {
        throw http_errors(400, 'invalid folder id');
      }
      const tasks = await task_model.getTasks(folderId);
      res.json({
        items : tasks
      });
    } catch (error) {
      next(error);
    }
  },
  async getTask(req, res, next) {
    try {
      const taskId = parseInt(req.query.id, 10);
      if (taskId < 0) {
        throw http_errors(400, 'invalid task id');
      }
      const task = await task_model.getTask(taskId);
      res.json(task);
    } catch (error) {
      next(error);
    }
  },

  async getTask_UserFolder(req, res, next) {
    console.log(req.query);
    try {
      const user_id = parsetInt(req.query.user_id, 10);
      const folder_id = parseInt(req.query.folder_id, 10);
      console.log(user_id, folder_id);
      if (task_id < 0 || user_id < 0) {
        throw http_errors(400, 'invalid user id or folder id');
      }
      const tasks = await task_model.getTask_UserFolder(user_id, folder_id);
      res.json(tasks);
    } catch (error) {
      next(error);
    }
  }
};
	