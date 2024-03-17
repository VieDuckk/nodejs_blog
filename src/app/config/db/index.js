var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'courses'
});

connection.connect((err, connection) => { if (err) console.log("ket noi that bai"); });

module.exports = connection;