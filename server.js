const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Endpoint to handle user registration
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  // Load the user database
  let users = JSON.parse(fs.readFileSync('users.json', 'utf8'));
  if (users.some(user => user.username === username)) {
    return res.status(409).send('Username already exists.');
  }
  users.push({ username, password });
  fs.writeFileSync('users.json', JSON.stringify(users));
  res.send('Registration successful!');
});

// Endpoint to handle user login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  // Load the user database
  let users = JSON.parse(fs.readFileSync('users.json', 'utf8'));
  const userExists = users.some(user => user.username === username && user.password === password);
  if (userExists) {
    res.send({ status: 'ok', message: 'Login successful' });
  } else {
    res.status(401).send('Invalid credentials or user does not exist.');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
