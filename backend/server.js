// Import necessary modules
const express = require('express'); // Express framework for creating server and handling routes
const bodyParser = require('body-parser'); // Middleware for parsing JSON request bodies
const cors = require('cors'); // Middleware for enabling Cross-Origin Resource Sharing (CORS)
const fs = require('fs'); // File system module for interacting with the file system
const path = require('path'); // Module for handling and resolving file paths
const dotenv = require('dotenv'); // Module for loading environment variables from a .env file

// Import route handlers
const registerRoute = require('./routes/register'); // Route for handling user registration
const loginRoute = require('./routes/login'); // Route for handling user login

// Configure environment variables
dotenv.config(); // Load environment variables from a .env file into process.env

const app = express(); // Create an Express application

// Middleware
app.use(cors({ origin: 'http://localhost:5000' }));
// Enable CORS for requests coming from 'http://localhost:5000', allowing the front-end to communicate with the server

app.use(bodyParser.json());
// Parse incoming request bodies in JSON format and make the parsed data available in req.body

// Read JSON files and parse their content into JavaScript objects
const games = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'routes', 'json', 'games.json'), 'utf-8')
);
// Synchronously read the games.json file from the specified path, parse its content, and store it in the `games` variable

const departments = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'routes', 'json', 'departments.json'), 'utf-8')
);
// Synchronously read the departments.json file from the specified path, parse its content, and store it in the `departments` variable

// Define routes
app.use('/register', registerRoute);
// Use the `registerRoute` handler for requests to the '/register' endpoint

app.use('/login', loginRoute);
// Use the `loginRoute` handler for requests to the '/login' endpoint

app.get('/departments', (req, res) => {
  res.json(departments);
  // Respond to GET requests on the '/departments' endpoint with the parsed contents of departments.json
});

app.get('/api/games', (req, res) => {
  res.json(games);
  // Respond to GET requests on the '/api/games' endpoint with the parsed contents of games.json
});

// Start the server
const PORT = process.env.PORT || 5000;
// Get the port number from the environment variables, defaulting to 5000 if not specified

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// Start the server and listen on the specified port, logging a message once it is running
