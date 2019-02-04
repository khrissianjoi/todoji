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