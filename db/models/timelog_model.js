const { pool } = require('../');

module.exports = {

  queryAllByUser: function queryAllLogsByUser(userId){
    return new Promise( (resolve, reject) => {
      pool.query(`SELECT * FROM dev_timelogs`)
      .then( ({rows}) => resolve(rows) )
      .catch( reject );
    });
  },

  clockIn: function clockIn(userId){
    return new Promise( (resolve, reject) => {
      pool.query(
        `INSERT INTO dev_timelogs (user_id, rate) VALUES ($1, 2500) RETURNING id;`,
        [userId]
      ).then( ({rows}) => resolve(rows[0].id) )
      .catch( reject );
    });
  },

  clockOut: function clockOut(userId){
    return new Promise( (resolve, reject) => {
      pool.query(`
        UPDATE dev_timelogs
        SET out_time=CURRENT_TIMESTAMP,
            total_time=CURRENT_TIMESTAMP-in_time,
            value=(EXTRACT(epoch FROM CURRENT_TIMESTAMP - in_time) / 3600 ) * rate
        WHERE user_id=$1 
          AND out_time IS NULL 
          RETURNING *;
        `,
        [userId]
      ).then( ({rows}) => {
        resolve(rows[0]);
      })
      .catch( reject );
    })
  },

  deleteById: function deleteTimelogById(id){
    return new Promise( (resolve, reject) => {
      pool.query(
        `DELETE FROM dev_timelogs WHERE id=$1`,
        [id]
      ).then( resolve )
      .catch( reject );
    });
  },

};