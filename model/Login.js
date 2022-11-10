const mysql = require('mysql');
const conn = mysql.createConnection({
  host : 'localhost',
  user : 'user1',
  password : '$user1*',
  database : 'kdt'
});
// connect database

exports.login = (data, callback) => {
  conn.query(`SELECT * FROM users WHERE userid = "${data.userid}"`,
  (err, rows) => {
    if(err) {
      throw err;
    }
    callback(rows);
  });
}

exports.signup = (data, callback) => {
  conn.query(
    `INSERT INTO users (userid, name, pw) VALUES ("${data.userid}", "${data.name}", "${data.pw}");`,
    (err) => {
      if(err) {
        throw err;
      }
      callback();
    }
  )
}