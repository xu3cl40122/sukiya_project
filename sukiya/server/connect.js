var mysql = require("mysql");

var conn = mysql.createConnection({
    host: 'localhost',
    user: 'mentor_admin',
    password: 'mentor_admin123',
    database: 'mentor_program_db',
    multipleStatements: true
});

conn.connect(function (err) {
    if (err) {
        console.log('connecting error');
        console.log(err)
        return;
    }
    console.log('connecting success');
});

module.exports = conn
