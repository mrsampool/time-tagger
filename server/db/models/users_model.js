const bcrypt = require('bcrypt');
const { pool } = require('../index');

module.exports = {
  create: function createUser(userInfo) {
    const {
      email, firstName, lastName, password,
    } = userInfo;
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, 10).then((hashed) => {
        pool
          .query(
            `
                INSERT INTO users 
                (first_name, last_name, email, password) 
                VALUES 
                ($1, $2, $3, $4)
                RETURNING id, first_name, last_name, email, password;
                `,
            [firstName, lastName, email, hashed],
          )
          .then(({ rows }) => resolve(rows))
          .catch(reject);
      });
    });
  },

  find: function findUser(email) {
    return new Promise((resolve, reject) => {
      pool
        .query(
          `
        SELECT 
        *,
        (
          SELECT 
          rate
          FROM timelogs
          WHERE timelogs.user_id=users.id
          ORDER BY in_time DESC
          LIMIT 1 
        )
        FROM users 
        WHERE email = $1;
        `,
          [email],
        )
        .then(({ rows }) => {
          console.log(rows);
          resolve(rows[0]);
        })
        .catch(reject);
    });
  },
};
