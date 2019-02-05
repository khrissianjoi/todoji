const bcrypt = require('bcrypt');
const db = require('../connection');

module.exports = {
  async createFolder(folder) {
    await db.query(
      `INSERT INTO folders
      (name, user_id)
      VALUES
      (?, ?)`,
      [folder.name, folder.user_id]
    );
  },
  
  async getFolders(userId) {
    const folders = await db.query(
      `SELECT id, name, user_id FROM folders WHERE user_id = ?`,
      [userId]
    );
    return folders.results;
  },

  async getFolder(folderId) {
    const folder = await db.query(
      `SELECT id, name, user_id FROM folders WHERE id = ?`,
      [folderId]
    );
    return folder.results[0];
  }
}