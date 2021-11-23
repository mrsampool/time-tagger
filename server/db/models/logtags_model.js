const { pool } = require("../index");

module.exports = {
  queryAllByUser: function queryAllTagsByUser(userId) {
    return new Promise((resolve, reject) => {
      pool
        .query(`SELECT * FROM dev_tags WHERE user_id=$1;`, [userId])
        .then(({ rows }) => resolve(rows))
        .catch(reject);
    });
  },

  tagLog: function tagLogEntryByLogIdAndTagNames(userId, logId, tagsArray) {
    return new Promise((resolve, reject) => {
      if (tagsArray) {
        this.queryAllByUser(userId).then((userTags) => {
          let tagPromises = tagsArray.map((inputTag) => {
            return new Promise((resolve, reject) => {
              if (userTags.length) {
                let preTag = userTags.find(
                  (userTag) => userTag.tag_name === inputTag
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
            });
          });

          Promise.all(tagPromises)
            .then((data) => {
              resolve();
            })
            .catch((err) => reject());
        });
      } else {
        resolve();
      }
    });
  },

  tagByTagId: function tagLogByTagId(logId, tagId) {
    return new Promise((resolve, reject) => {
      pool
        .query(`INSERT INTO dev_logtags (log_id, tag_id) values ($1, $2)`, [
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
            INSERT INTO dev_tags (user_id, tag_name) VALUES ($2, $3)
            RETURNING tag_id
        )
        INSERT INTO dev_logtags (log_id, tag_id)
        SELECT $1, (SELECT tag_id from tid);
        `,
          [logId, userId, tagName]
        )
        .then((data) => resolve())
        .catch((err) => reject(err));
    });
  },

  create: function createTagByName(tagName, userId) {
    return new Promise((resolve, reject) => {
      pool
        .query(
          `INSERT INTO dev_tags (user_id, tag_name) VALUES ($1, $2) RETURNING tag_id;`,
          [userId, tagName]
        )
        .then(({ rows }) => {
          resolve(rows[0].tag_id);
        })
        .catch((err) => console.log(err));
    });
  },
};
