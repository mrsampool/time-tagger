const timelog = require('../db/models/timelog_model');
const tags = require('../db/models/logtags_model');

module.exports = {

  clockIn: function clockIn(req, res, next){

    timelog.clockIn(req.params.userId, req.body.rate / 100 || 5000)
    .then( insertId => {

      tags.queryAllByUser(req.params.userId)
      .then( userTags =>{

        Promise.all(
          req.body.tags.map( clockTag =>{

            let preTag = userTags.find( userTag =>{
              return userTag.tag_name === clockTag;
            });
            if (preTag){
              tags.tagByTagId(insertId, preTag.tag_id);
            } else {

            }

          })
        )

      });
    })
    .catch( err => console.log(err) );
  },

  clockOut: function clockOut(req, res, next){
    timelog.clockOut(req.params.userId)
    .then( clockedOut => res.status(200).send(clockedOut) )
    .catch( err => console.log(err) );
  }

};