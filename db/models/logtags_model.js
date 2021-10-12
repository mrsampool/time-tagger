const { pool } = require('../');

module.exports = {

  queryAllByUser: function queryAllTagsByUser(userId){
    return new Promise( (resolve, reject) => {
      pool.query(`SELECT * FROM dev_tags WHERE user_id=$1;`,[userId])
      .then( ({rows}) => resolve(rows) )
      .catch( reject );
    });
  },

  tagByTagId: function tagLogByLogId(logId, tagId){

  }

}