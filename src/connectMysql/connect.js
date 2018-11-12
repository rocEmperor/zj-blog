const mysql = require('mysql');
const connection = mysql.createConnection({
  host: '192.168.1.112',
  port: '3306',
  user: 'root',
  password : 'zhujia360!@#',
  database : 'zj_blog'
});
 
connection.connect();

module.exports = connection;