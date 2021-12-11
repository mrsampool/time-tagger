const { pool } = require('../index');
const {reject} = require("bcrypt/promises");
const {deleteByLogEntry} = require("./logtags_model");

module.exports = {
  queryAllByUser: function queryAllTagsByUser(userId) {
    return new Promise((resolve, reject) => {
      pool
        .query('SELECT * FROM tags WHERE user_id=$1;', [userId])
        .then(({ rows }) => resolve(rows))
        .catch(reject);
    });
  },

  deleteByLogEntry: function deleteTagsByLogEntry(logId) {
    return new Promise((resolve, reject) => {
      pool.query(`DELETE FROM logtags WHERE log_id=$1`, [logId])
        .then(() => resolve())
        .catch((err) => console.log(err));
    });
  },

  tagLog: function tagLogEntryByLogIdAndTagNames(userId, logId, tagsArray) {
    return new Promise((resolve, reject) => {
      this.deleteByLogEntry(logId)
        .then(() => {
          if (tagsArray) {
            this.queryAllByUser(userId).then((userTags) => {
              const tagPromises = tagsArray.map((inputTag) => new Promise((resolve, reject) => {
                if (userTags.length) {
                  const preTag = userTags.find(
                    (userTag) => userTag.tag_name === inputTag,
                  );
                  if (preTag) {
                    this.tagByTagId(logId, preTag.tag_id)
                      .then((data) => resolve())
                      .catch((data) => reject());
                  } else {
                    this.tagNewTag(logId, userId, inputTag)
                      .then((data) => resolve())
                      .catch((err) => reject(err));
                  }
                } else {
                  this.tagNewTag(logId, userId, inputTag)
                    .then((data) => resolve())
                    .catch((err) => reject(err));
                }
              }));
              Promise.all(tagPromises)
                .then((data) => {
                  resolve();
                })
                .catch((err) => reject());
            });
          } else {
            resolve();
          }
        })
        .catch((err) => console.log(err));
    });
  },

  tagByTagId: function tagLogByTagId(logId, tagId) {
    return new Promise((resolve, reject) => {
      pool
        .query('INSERT INTO logtags (log_id, tag_id) values ($1, $2)', [
          logId,
          tagId,
        ])
        .then((data) => {
          resolve(data);
        })
        .catch(reject);
    });
  },

  tagNewTag: function tagLogNewTag(logId, userId, tagName) {
    return new Promise((resolve, reject) => {
      pool
        .query(
          `
        WITH tid AS (
            INSERT INTO tags (user_id, tag_name) VALUES ($2, $3)
            RETURNING tag_id
        )
        INSERT INTO logtags (log_id, tag_id)
        SELECT $1, (SELECT tag_id from tid);
        `,
          [logId, userId, tagName],
        )
        .then((data) => resolve())
        .catch((err) => reject(err));
    });
  },

  create: function createTagByName(tagName, userId) {
    return new Promise((resolve, reject) => {
      pool
        .query(
          'INSERT INTO tags (user_id, tag_name) VALUES ($1, $2) RETURNING tag_id;',
          [userId, tagName],
        )
        .then(({ rows }) => {
          resolve(rows[0].tag_id);
        })
        .catch((err) => console.log(err));
    });
  },
};
