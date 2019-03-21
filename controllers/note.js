const http_errors = require('http-errors');
const post_note_schema = require('../helpers/validators/post-note');
const patch_note_schema = require('../helpers/validators/patch-note');
const note_model = require('../models/note')

module.exports = {
  async postNote(req, res, next) {
    try {
      const schema_errors = post_note_schema(req.body);
      if (schema_errors) {
        throw http_errors(400, schema_errors);
      }
      await note_model.createNote(req.body);
      res.status(200).end();
    } catch (error) {
      next(error);
    }
  },

  async getNotes(req, res, next) {
    try {
      if ('folder_id' in req.query)
      {
        const user_id = parseInt(req.query.user_id, 10);
        const folder_id = parseInt(req.query.folder_id, 10);
        if (folder_id < 0 || user_id < 0) {
        throw http_errors(400, 'invalid user id or folder id');
        }
        const notes = await note_model.getNote_UserFolder(user_id, folder_id);
        res.json(notes);
      }
      else {
        const userId = parseInt(req.query.user_id, 10);
        if (userId < 0) {
          throw http_errors(400, 'invalid user id');
        }
        const note = await note_model.getNotes(userId);
        const notes = {items : note};
        res.json(notes);
      }
    } catch (error) {
      next(error);
    }
  },

  async getNote(req, res, next) {
    try{
      const noteId = parseInt(req.query.id, 10);
      if (noteId < 0) {
        throw http_errors(400, 'invalid note id')
      }
      const note = await note_model.getNote(noteId);
      res.json(note);
    } catch (error) {
      next(error);
    }
  },

  async deleteNote(req, res, next) {
    try {
      const noteId = parseInt(req.query.id, 10);
      if (noteId < 0) {
        throw http_errors(400, 'invalid note id');
      }
      await note_model.deleteNote(noteId);
      res.status(200).end();
    } catch (error) {
      next(error);
    }
  },

  async patchNote(req,res, next) {
    try {
      const schema_errors = patch_note_schema(req.body);
      if (schema_errors) {
        throw http_errors(400, schema_errors);
      }
      const noteId = parseInt(req.query.id, 10);
      if (noteId < 0) {
        throw http_errors(400, 'invalid note id');
      }
      await note_model.patchNote(req.body, noteId);
      res.status(200).end();
    } catch(error) {
      next(error);
    }
  }
}