const mysql = require('mysql');
const conn = mysql.createConnection({
  host : 'localhost',
  user : 'user1',
  password : '$user1*',
  database : 'kdt'
});
// connect database

exports.getVisitors = (callback) => {
  conn.query('SELECT * FROM visitor', (err, rows) => {
    if (err) {
      throw err;
    }
    callback(rows);
  });
};

exports.addVisitor = (form, callback) => {
  if (!form.name) {
    callback([{id : 0, comment : "Name length 0", errorId : 0}]);
    return 0;
  } else if (!form.comment) {
    callback([{id : 0, comment : "Comment length 0", errorId : 1}]);
    return 0;
  } else if (form.name.length > 10) {
    callback([{id : 0, comment : "Name range out", errorId : 2}]);
    return 0;
  }
  conn.query(`INSERT INTO visitor (name, comment) VALUES ("${form.name}", "${form.comment}")`);
  conn.query("SELECT * FROM visitor ORDER BY id DESC LIMIT 1", (err, rows) => {
    if (err) {
      throw err;
    }
    callback(rows);
  });
};

exports.deleteVisitor = (id, callback) => {
  conn.query(`DELETE FROM visitor WHERE id = ${id}`, (err, rows) => {
    if (err) {
      throw err;
    }
    callback(rows);
  });
};

exports.editComment = (data, callback) => {
  if (!data.name) {
    callback({id : 0, comment : "Name length 0", errorId : 0});
    return 0;
  } else if (!data.comment) {
    callback({id : 0, comment : "Comment length 0", errorId : 1});
    return 0;
  } else if (data.name.length > 10) {
    callback({id : 0, comment : "Name range out", errorId : 2});
    return 0;
  }
  conn.query(`UPDATE visitor SET name = "${data.name}", comment = "${data.comment}" WHERE id = "${Number(data.id)}"`, (err) => {
    if(err) {
      throw err;
    }
    callback({id : true, comment : "Edit successful"});
  });
};