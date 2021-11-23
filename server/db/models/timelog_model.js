const { pool } = require("../index");

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
            rate, 
            value, 
            (SELECT array(
                SELECT t2.tag_name
                FROM dev_logtags t1
                LEFT JOIN dev_tags t2
                ON t1.tag_id=t2.tag_id
                WHERE log_id=dev_timelogs.id
                GROUP BY t1.tag_id, t2.tag_name
            ) AS TAGS)
        FROM dev_timelogs;
        `
        )
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
            rate, 
            value, 
            (SELECT array(
                SELECT t2.tag_name
                FROM dev_logtags t1
                LEFT JOIN dev_tags t2
                ON t1.tag_id=t2.tag_id
                WHERE log_id=dev_timelogs.id
                GROUP BY t1.tag_id, t2.tag_name
            ) AS TAGS)
        FROM dev_timelogs
        WHERE id=$1;
      `,
          [logId]
        )
        .then(({ rows }) => resolve(rows))
        .catch(reject);
    });
  },

  clockIn: function clockIn(userId, rate) {
    return new Promise((resolve, reject) => {
      pool
        .query(
          `INSERT INTO dev_timelogs (user_id, rate) VALUES ($1, $2) RETURNING id;`,
          [userId, rate]
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
        UPDATE dev_timelogs
        SET out_time=CURRENT_TIMESTAMP,
            total_time=CURRENT_TIMESTAMP-in_time,
            value=(EXTRACT(epoch FROM CURRENT_TIMESTAMP - in_time) / 3600 ) * rate
        WHERE user_id=$1 
          AND out_time IS NULL 
          RETURNING *;
        `,
          [userId]
        )
        .then(({ rows }) => {
          resolve(rows[0]);
        })
        .catch(reject);
    });
  },

  deleteById: function deleteTimelogById(id) {
    return new Promise((resolve, reject) => {
      pool
        .query(`DELETE FROM dev_timelogs WHERE id=$1`, [id])
        .then(resolve)
        .catch(reject);
    });
  },
};
