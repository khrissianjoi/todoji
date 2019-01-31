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
