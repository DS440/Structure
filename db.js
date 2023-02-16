const mysql = require('mysql');

const con = mysql.createConnection({
    host: "parkpal-instance-1.cp4hkrqf72vo.us-west-2.rds.amazonaws.com",
    user: "admin",
    password: "parkpal88888"
});

con.connect(function(err) {
    if (err) throw err;
    con.query('CREATE DATABASE IF NOT EXISTS business;');
    con.query('USE business;');
    con.query('CREATE TABLE IF NOT EXISTS users(id int NOT NULL AUTO_INCREMENT, username varchar(30), password char(60), PRIMARY KEY(id));', function(error, result, fields) {
        console.log(result);
    });
    con.end();
});

