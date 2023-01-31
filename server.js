const express = require('express');
const app = express();
const path = require('path');

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Serve the login page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});