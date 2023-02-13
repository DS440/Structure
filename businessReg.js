const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();
app.post('/users', (req, res) => {
    if (req.query.username && req.query.password) {
        console.log('Request received');
        con.connect(function(err) {
            con.query(`INSERT INTO business.users (username, password) VALUES ('${req.query.username}', '${req.query.password}')`, function(err, result, fields) {
                if (err) res.send(err);
                if (result) res.send({username: req.query.username, password: req.query.password});
                if (fields) console.log(fields);
            });
        });
    } else {
        console.log('Missing a parameter');
    }
});
app.get('/users', (req, res) => {
    con.connect(function(err) {
        con.query(`SELECT * FROM business.users`, function(err, result, fields) {
            if (err) res.send(err);
            if (result) res.send(result);
        });
    });
});