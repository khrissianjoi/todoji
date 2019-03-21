-- These we will run manually to update the DB schema as we go along.
-- Either parts of the file can be applied, or the complete file
-- can be loaded if starting from nothing.
--
-- The reason this is in 1 file instead of being broken into many,
-- is to simplify git merging and loading it in.


-- Migration 1
CREATE DATABASE todoji;

USE todoji;
-- End of Migration 1


-- Migration 2
CREATE TABLE users (
  id INTEGER NOT NULL AUTO_INCREMENT,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(200) NOT NULL,
  password_hash VARCHAR(100) NOT NULL, -- bcrypt password hash
  PRIMARY KEY (id),
  UNIQUE (email)
) CHARACTER SET = utf8;
-- End of Migration 2

-- Migration 3
CREATE TABLE folders (
  id INTEGER NOT NULL AUTO_INCREMENT,
  name VARCHAR(150) NOT NULL,
  user_id INTEGER NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id)
    REFERENCES users(id)
) CHARACTER SET = utf8;
-- End of Migration 3

-- Migration 4
CREATE TABLE tasks (
  id INTEGER NOT NULL AUTO_INCREMENT,
  title VARCHAR(150) NOT NULL,
  due_date DATETIME NOT NULL,
  description TEXT(750) NOT NULL,
  status SMALLINT NOT NULL,
  folder_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (folder_id)
    REFERENCES folders(id),
  FOREIGN KEY (user_id)
    REFERENCES users(id)
) CHARACTER SET = utf8;
-- End of Migration 4

CREATE TABLE notes (
  id INTEGER NOT NULL AUTO_INCREMENT,
  title VARCHAR(150) NOT NULL,
  description TEXT(750) NOT NULL,
  content LONGTEXT NOT NULL,
  folder_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (folder_id)
    REFERENCES folders(id),
  FOREIGN KEY (user_id)
    REFERENCES users(id)
) CHARACTER SET = utf8;
-- End of Migration 5