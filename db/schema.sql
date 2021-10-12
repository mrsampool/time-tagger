DROP DATABASE IF EXISTS timetagger;
CREATE DATABASE timetagger;
\c timetagger;

DROP TABLE IF EXISTS users, dev_timelogs, dev_logtags;

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
    out_time timestamptz DEFAULT CURRENT_TIMESTAMP,
    total_time INTEGER,
    rate INTEGER,
    value INTEGER
);

CREATE TABLE dev_logtags (
    log_id INTEGER NOT NULL,
    tag VARCHAR (100)
);

INSERT INTO users (username, first_name, last_name, email) VALUES ('dev', 'dev', 'dev', 'dev');