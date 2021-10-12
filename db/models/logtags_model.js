const { pool } = require('../');

module.exports = {

  queryAllByUser: function queryAllTagsByUser(userId){
    return new Promise( (resolve, reject) => {
      pool.query(`SELECT * FROM dev_tags WHERE user_id=$1;`,[userId])
      .then( ({rows}) => resolve(rows) )
      .catch( reject );
    });
  },

  tagLog: function tagLogEntryByLogIdAndTagNames(userId, logId, tagsArray){
    return new Promise( (resolve, reject) => {
      this.queryAllByUser(userId).then( userTags =>{
        Promise.all( tagsArray.map( inputTag =>{

          return new Promise( (resolve, reject) =>{
            if (userTags.length){
              let preTag = userTags.find( userTag => userTag.tag_name === inputTag );
              if (preTag){
                this.tagByTagId(logId, preTag.tag_id)
                .then( resolve )
                .catch( reject );
              }
            }
            this.tagNewTag(logId, userId, inputTag)
            .then( resolve )
            .catch( reject );
          });

        }) ).then( resolve ).catch( reject );
      });
    })
  },

  tagByTagId: function tagLogByTagId(logId, tagId){
    return new Promise( (resolve, reject) => {
      pool.query(`INSERT INTO dev_logtags (log_id, tag_id) values ($1, $2)`, [logId, tagId])
      .then( data => {
        resolve(rows);
      })
      .catch( reject );
    })
  },

  tagNewTag: function tagLogNewTag(logId, userId, tagName){
    return new Promise( (resolve, reject) => {
      pool.query(`
        WITH tid AS (
            INSERT INTO dev_tags (user_id, tag_name) VALUES (1, 'newTag') \
            RETURNING tag_id
        )
        INSERT INTO dev_logtags (log_id, tag_id)
        SELECT 5, (SELECT tag_id from tid);
        `, [logId, userId, tagName])
    });
  },

  create: function createTagByName(tagName, userId){
    return new Promise( (resolve, reject) => {
      pool.query(`INSERT INTO dev_tags (user_id, tag_name) VALUES ($1, $2) RETURNING tag_id;`,
        [userId, tagName]
      ).then( ({ rows }) => {
        resolve( rows[0].tag_id )
      })
      .catch( err => console.log(err) );
    });
  },

}