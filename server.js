const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')))
app.use(session)
// http://localhost:3000/
app.get('/views', function(request, response) {
	// Render login template
	response.sendFile(path.join(__dirname, '/index.html'));
});

// http://localhost:3000/
app.post('/auth', function(request, response) {
	// Capture the input fields
	let username = request.body.username;
	let password = request.body.password;
	// Ensure the input fields exists and are not empty
	if (username && password) {
		// Execute SQL query that'll select the business table from the database based on the specified username and password
		con.query('SELECT * FROM business.users WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			// If there is an issue with the query, output the error
			if (error) throw error;
			// If the account exists
			if (results.length > 0) {
				// Authenticate the user
				request.session.loggedIn = true;
				request.session.username = username;
				// Redirect to home page
				response.redirect('/');
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

// http://localhost:3000/home
app.get('/', function(request, response) {
	// If the user is loggedin
	if (request.session.loggedIn) {
		// Output username
		response.sendFile(path.join(__dirname, 'views/dashboard.html'));;
	} else {
		// Not logged in
		response.send('Please login to view this page!');
	}
	response.end();
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});