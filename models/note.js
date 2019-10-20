const bcrypt = require('bcrypt');
const db = require('../helpers/connection');

module.exports = {
  async createNote(note) {
		await db.query(
			`INSERT INTO notes
			(title, description, content, folder_id, user_id)
			VALUES
			(?, ?, ?, ?, ?)`,
			[note.title, note.description, note.content, note.folder_id, note.user_id]
    );
  },
	async getNotes(userId) {
		const notes = await db.query(
			`SELECT id, title, description, content, folder_id, user_id
			FROM notes WHERE user_id = ?`,
			[userId]
		);
		return notes.results;
	},
  
	async getNote_UserFolder(userId, folderId) {
		const notes = await db.query(
			`SELECT id, title, description, content, folder_id, user_id
			FROM notes WHERE user_id = ? AND folder_id = ?`,
			[userId, folderId]
		);
		return notes.results;
	},

  async getNote(noteId) {
    const note = await db.query(
      `SELECT id, title, description, content, folder_id, user_id
      FROM notes WHERE id = ?`,
      [noteId]
    );
    return note.results;
  },

  async deleteNote(noteId) {
    await db.query(`DELETE from notes WHERE id = ?`,
    [noteId]
    );
  },  

  async patchNote(note, noteId) {
    await db.query(
      `UPDATE notes SET ? WHERE id = ?`,
      [note, noteId]
    )
  }  
};