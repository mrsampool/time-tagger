DROP DATABASE IF EXISTS timetagger;
CREATE DATABASE timetagger;
\c timetagger;

DROP TABLE IF EXISTS users, dev_timelogs, dev_tags, dev_logtags;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR (30),
    first_name VARCHAR (20),
    last_name VARCHAR (30),
    email VARCHAR (40)
);

CREATE TABLE dev_timelogs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    in_time timestamptz DEFAULT CURRENT_TIMESTAMP,
    out_time timestamptz DEFAULT NULL,
    total_time interval DEFAULT NULL,
    rate INTEGER NOT NULL,
    value INTEGER DEFAULT NULL
);

CREATE TABLE dev_tags (
    tag_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    tag_name VARCHAR (100) NOT NULL
);

CREATE TABLE dev_logtags (
    log_id INTEGER NOT NULL,
    tag_id INTEGER NOT NULL
);

INSERT INTO users (username, first_name, last_name, email) VALUES ('dev', 'dev', 'dev', 'dev');