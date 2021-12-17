const { pool } = require('../index');
// const tags = require("./db/models/logtags_model");

module.exports = {
  queryAllByUser: function queryAllLogsByUser(userId) {
    return new Promise((resolve, reject) => {
      pool
        .query(
          `
        SELECT 
            id, 
            to_char(in_time, 'Dy MM.DD.YY') AS inDate,
            to_char(out_time, 'Dy MM.DD.YY') AS outDate,
            to_char( in_time, 'HH:MI am' ) AS inTime,
            to_char( out_time, 'HH:MI am' ) AS outTime,
            to_char( total_time, 'HH24h MIm SSs' ) AS totalTime,
            in_time AS inTimeObj,
            out_time AS outTimeObj,
            rate, 
            value, 
            (SELECT array(
                SELECT t2.tag_name
                FROM logtags t1
                LEFT JOIN tags t2
                ON t1.tag_id=t2.tag_id
                WHERE log_id=timelogs.id
                GROUP BY t1.tag_id, t2.tag_name
            ) AS TAGS)
        FROM timelogs
        WHERE user_id=$1
        ORDER BY id DESC;
        `, [userId])
        .then(({ rows }) => resolve(rows))
        .catch(reject);
    });
  },

  queryByLogId: function queryLogsByLogId(logId) {
    return new Promise((resolve, reject) => {
      pool
        .query(
          `
        SELECT 
            id, 
            to_char(in_time, 'Dy MM.DD.YY') AS inDate,
            to_char(out_time, 'Dy MM.DD.YY') AS outDate,
            to_char( in_time, 'HH:MI am' ) AS inTime,
            to_char( out_time, 'HH:MI am' ) AS outTime,
            to_char( total_time, 'HH24h MIm SSs' ) AS totalTime,
            in_time AS inTimeObj,
            out_time AS outTimeObj,
            rate, 
            value, 
            (SELECT array(
                SELECT t2.tag_name
                FROM logtags t1
                LEFT JOIN tags t2
                ON t1.tag_id=t2.tag_id
                WHERE log_id=timelogs.id
                GROUP BY t1.tag_id, t2.tag_name
            ) AS TAGS)
        FROM timelogs
        WHERE id=$1;
      `,
          [logId],
        )
        .then(({ rows }) => resolve(rows))
        .catch(reject);
    });
  },

  clockIn: function clockIn(userId, rate) {
    return new Promise((resolve, reject) => {
      pool
        .query(
          'INSERT INTO timelogs (user_id, rate) VALUES ($1, $2) RETURNING id;',
          [userId, rate],
        )
        .then(({ rows }) => resolve(rows[0].id))
        .catch(reject);
    });
  },

  clockOut: function clockOut(userId) {
    return new Promise((resolve, reject) => {
      pool
        .query(
          `
        UPDATE timelogs
        SET out_time=CURRENT_TIMESTAMP,
            total_time=CURRENT_TIMESTAMP-in_time,
            value=(EXTRACT(epoch FROM CURRENT_TIMESTAMP - in_time) / 3600 ) * rate
        WHERE user_id=$1 
          AND out_time IS NULL 
          RETURNING *;
        `,
          [userId],
        )
        .then(({ rows }) => {
          resolve(rows[0]);
        })
        .catch(reject);
    });
  },

  editEntry: function editLogEntry(id, logInfo) {
    const {
      intime, outtime, rate,
    } = logInfo;
    return new Promise((resolve, reject) => {
      pool
        .query(
          `
          UPDATE timelogs
          SET
            in_time = $1::timestamptz,
            out_time = $2::timestamptz,
            rate = $3::INTEGER,
            total_time = $2::timestamptz - $1::timestamptz,
            value = (EXTRACT(epoch FROM ($2::timestamptz - $1::timestamptz)) / 3600) * $3
          WHERE id = $4
          RETURNING 
            id AS entry, 
            user_id AS user;
        `,
          [intime, outtime, rate, id],
        )
        .then(({ rows }) => resolve(rows[0]))
        .catch(reject);
    });
  },

  deleteById: function deleteTimelogById(id) {
    return new Promise((resolve, reject) => {
      pool
        .query('DELETE FROM timelogs WHERE id=$1', [id])
        .then(resolve)
        .catch(reject);
    });
  },
};
