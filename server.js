const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');


const hostname = process.env['hostName']
const DB_userName =  process.env['DB_userName']
const DB_password = process.env['DB_password']

const con = mysql.createConnection({
    host: hostname,
    user: DB_userName,
    password: DB_password
});


app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // change to true in production if using HTTPS
}));
// http://localhost:3000/
app.get('/', function(request, response) {
	// Render login template
	response.sendFile(path.join(__dirname, 'views/index.html'));
});
// http://localhost:3000/
app.post('/auth', function(request, response) {
	// Capture the input fields
	const username = request.body.username;
	const password = request.body.password;
  const query = `SELECT * FROM business.BusinessUsers WHERE LotID = '${username}' AND password = '${password}'`;
	// Ensure the input fields exists and are not empty
	if (username && password) {
		// Execute SQL query that'll select the business table from the database based on the specified username and password
		con.query(query, function(error, results, fields) {
			// If there is an issue with the query, output the error
			if (error) throw error;
			// If the account exists
			if (results.length > 0) {
				// Authenticate the user
				request.session.loggedIn = true;
				request.session.username = username;
				// Redirect to home page
				response.redirect('/dashboard');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

// http://localhost:3000/dashboard

app.get('/dashboard', function(request, response) {
  if (request.session.loggedIn) {
		response.sendFile(path.join(__dirname, 'views/dashboard.html'));
	} else {
		// Not logged in
		response.redirect('/');
	}
});


app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});