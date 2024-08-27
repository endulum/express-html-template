-- users store

DROP TABLE IF EXISTS "users";
CREATE TABLE IF NOT EXISTS "users" (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR(32) NOT NULL,
  password VARCHAR(255) NOT NULL
);

-- session store

DROP TABLE IF EXISTS "session";
CREATE TABLE IF NOT EXISTS "session" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_session_expire" ON "session" ("expire");

-- https://github.com/voxpelli/node-connect-pg-simple/blob/HEAD/table.sql