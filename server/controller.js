const passport = require('passport');
const timelog = require('./db/models/timelog_model');
const tags = require('./db/models/logtags_model');
const users = require('./db/models/users_model');
const {reject} = require("bcrypt/promises");

module.exports = {
  getUserLog: function getLogByUser(req, res, next) {
    return new Promise((resolve, reject) => {
      timelog
        .queryAllByUser(req.params.userId)
        .then((log) => {
          res.status(200).send(log);
          resolve();
        })
        .catch(reject);
    });
  },

  clockIn: function clockIn(req, res, next) {
    let inserted;
    return new Promise((resolve, reject) => {
      const userId = Number(req.params.userId);
      timelog
        .clockIn(userId, req.body.rate * 100 || 5000)
        .then((insertId) => {
          inserted = insertId;
          tags.tagLog(userId, insertId, req.body.tags).then((data) => {
            timelog
              .queryByLogId(inserted)
              .then((data) => {
                console.log(data[0]);
                res.status(201).send(data[0]);
                resolve();
              })
              .catch((err) => console.log(err));
          });
        })
        .catch(reject);
    });
  },

  clockOut: function clockOut(req, res, next) {
    console.log('clock out');
    return new Promise((resolve, reject) => {
      timelog
        .clockOut(req.params.userId)
        .then((clockedOut) => res.status(200).send(clockedOut))
        .catch((err) => console.log(err));
    });
  },

  editEntry: function editLogEntry(req, res) {
    timelog
      .editEntry(req.body.entry)
      .then(({ entry, user }) => {
        tags.tagLog(user, entry, req.body.entry.tags)
          .then(() => {
            timelog.queryByLogId(entry)
              .then((data) => {
                console.log(data);
                res.status(201).send(data[0]);
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
    /*
    return new Promise((resolve, reject) => {
    });
     */
  },

  createUser: function createUser(req, res, next) {
    console.log('create user');
    return new Promise((resolve, reject) => {
      users
        .create(req.body.userInfo)
        .then((newUser) => {
          res.sendStatus(200);
        })
        .catch((err) => console.log(err));
    });
  },

  logOut: function logOut(req, res) {
    console.log('logOut');
    req.logout();
    res.sendStatus(200);
  },
};
