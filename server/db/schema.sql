DROP DATABASE IF EXISTS timetagger;
CREATE DATABASE timetagger;
\c timetagger;

DROP TABLE IF EXISTS users, timelogs, tags, logtags, "session";

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR (20),
    last_name VARCHAR (30),
    email VARCHAR (40),
    password VARCHAR (100)
);

CREATE TABLE timelogs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    in_time timestamptz DEFAULT CURRENT_TIMESTAMP,
    out_time timestamptz DEFAULT NULL,
    total_time interval DEFAULT NULL,
    rate INTEGER NOT NULL,
    value INTEGER DEFAULT NULL
);

CREATE TABLE tags (
    tag_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    tag_name VARCHAR (100) NOT NULL,
    UNIQUE(tag_name)
);

CREATE TABLE logtags (
    log_id INTEGER NOT NULL,
    tag_id INTEGER NOT NULL
);

CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
	"sess" json NOT NULL,
	"expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_session_expire" ON "session" ("expire");

INSERT INTO users
(first_name, last_name, email, password)
VALUES
('demo', 'demo', 'demo', 'demo');