/*
  Everything to do with getting, creating, and updating users
  goes here.
*/
const bcrypt = require('bcrypt');
const db = require('../connection');

module.exports = {
  async createUser(user) {
    /*
      Hash the password so the hackers have a harder time
      When it comes time to determine if a plaintext password matches
      the hash, use bcrypt.compare()
    */
    const password_hash = await bcrypt.hash(user.password, 10);

    await db.query(
      `INSERT INTO users
      (name, email, password_hash)
      VALUES
      (?, ?, ?)`,
      [user.name, user.email, password_hash]
    );
  }
}
