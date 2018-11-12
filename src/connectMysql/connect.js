const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'ieonline.microsoft.com',
  port: '3306',
  user: 'root',
  password : '123456',
  database : 'lupeng'
});
 
connection.connect();

module.exports = connection;