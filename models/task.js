const bcrypt = require('bcrypt');
const db = require('../helpers/connection');

module.exports = {
  async createTask(task) {
		const due_date = new Date(task.due_date);
		await db.query(
			`INSERT INTO tasks
			(title, due_date, description, status, folder_id, user_id)
			VALUES
			(?, ?, ?, ?, ?, ?)`,
			[task.title, due_date, task.description, task.status, task.folder_id, task.user_id]
    );
  },

	async getTasks(userId) {
		const tasks = await db.query(
			`SELECT id, title, due_date, description, status, folder_id, user_id
			FROM tasks WHERE user_id = ?`,
			[userId]
		);
		return tasks.results;
	},

	async getTask(taskId) {
		const task = await db.query(
			`SELECT id, title, due_date, description, status, folder_id, user_id
			FROM tasks WHERE id = ?`,
			[taskId]
		);
		return task.results;
	},

	async getTask_UserFolder(userId, folderId) {
		const tasks = await db.query(
			`SELECT id, title, due_date, description, status, folder_id, user_id
			FROM tasks WHERE user_id = ? AND folder_id = ?`,
			[userId, folderId]
		);
		return tasks.results;
	},

	async deleteTask(taskId) {
		await db.query(`DELETE from tasks WHERE id = ?`,
		[taskId]
		);	
	},

	async patchTask(task, taskId) {
		await db.query(
			`UPDATE tasks SET ? WHERE id = ?`,
			[task, taskId]
		)
	}
};