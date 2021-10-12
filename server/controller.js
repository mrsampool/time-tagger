const timelog = require('../db/models/timelog_model');
const tags = require('../db/models/logtags_model');

module.exports = {

  clockIn: function clockIn(req, res, next){
    return new Promise( (resolve, reject) =>{
      let userId = Number(req.params.userId);
      timelog.clockIn(userId, (req.body.rate / 100) || 5000)
      .then( insertId => {
        tags.tagLog(userId, insertId, req.body.tags)
      }).then( resolve )
      .catch( reject );
    });
  },

  clockOut: function clockOut(req, res, next){
    timelog.clockOut(req.params.userId)
    .then( clockedOut => res.status(200).send(clockedOut) )
    .catch( err => console.log(err) );
  }

};