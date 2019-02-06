/*
  Everything to do with getting, creating, and updating users
  goes here.
*/
    /*
      Hash the password so the hackers have a harder time
      When it comes time to determine if a plaintext password matches
      the hash, use bcrypt.compare()

      once again, we tag the function as "async" to let it run in the
      background without blocking other people's requests, and all
      functions that support Promises are called with "await", basically
      telling our code (even though it's still asynchronous, and not
      blocking anything else) to wait for the result of that function
      before processing the next instruction of the async function.
      Even though await "pauses" the code until a result is given, it only
      "pauses" the async function that is running in the background that
      called it.
      Without async/await, the following code would look something like this:

      bcrypt.hash(user.password, 10, (err, hash) => {
        if (err) {
          return err;
        }
        db.query(
          `INSERT INTO users
          (name, email, password_hash)
          VALUES
          (?, ?, ?)`,
          [user.name, user.email, password_hash],
          (err, results, fields) => {
            if (err) {
              return err;
            }
          }
        );
      });

    */
const bcrypt = require('bcrypt');
const db = require('../connection');

module.exports = {
  async createUser(user) {
    const password_hash = await bcrypt.hash(user.password, 10);

    await db.query(
      `INSERT INTO users
      (name, email, password_hash)
      VALUES
      (?, ?, ?)`,
      [user.name, user.email, password_hash]
    );
  },

  async getUser(userId) {
    const tmp = await db.query(
      'SELECT name, email FROM users WHERE id = ?',
      [userId]
    );
    return tmp.results[0];
  },

  async getUsers() {
    const users = await db.query(
      'SELECT id, name, email FROM users',
    );
    return users.results;
  },

  async deleteUser(userId) {
    await db.query(
      `DELETE FROM users WHERE id = ?`,
      [userId]
    );
  },

  async patchUser(user, userId) {
    if ('password' in user) {
      const new_password_hash = await bcrypt.hash(user.password, 10);
      user.password_hash = new_password_hash
      delete user.password
    }
    await db.query(
    `UPDATE users SET ? WHERE id = ?`,
    [user, userId]
    );
  }
}
