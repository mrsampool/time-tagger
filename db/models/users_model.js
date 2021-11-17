const { pool } = require('../');

module.exports = {

    create: function createUser(userInfo) {
        const {email, firstName, lastName, password} = userInfo;
        return new Promise((resolve, reject) => {
            pool.query(`
        INSERT INTO users 
        (first_name, last_name, email, password) 
        VALUES 
        ($1, $2, $3, $4);
        `, [firstName, lastName, email, password])
                .then(({rows}) => resolve(rows))
                .catch(reject);
        });
    },

    find: function findUser(email) {
        return new Promise((resolve, reject) => {
            pool.query(`
        SELECT * FROM users WHERE email = $1;
        `, [email])
                .then(({rows}) => resolve(rows[0]))
                .catch(reject);
        });
    }
}