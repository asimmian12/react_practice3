// Import necessary modules
const express = require('express'); // Express framework for creating server and handling routes
const bodyParser = require('body-parser'); // Middleware for parsing JSON request bodies
const cors = require('cors'); // Middleware for enabling Cross-Origin Resource Sharing (CORS)
const fs = require('fs'); // File system module for interacting with the file system
const path = require('path'); // Module for handling and resolving file paths
const dotenv = require('dotenv'); // Module for loading environment variables from a .env file

const registerRoute = require('./Register'); // Route for handling user registration
const loginRoute = require('./Login'); // Route for handling user login

// Configure environment variables
dotenv.config(); // Load environment variables from a .env file into process.env

const app = express(); // Create an Express application

// Middleware
app.use(cors({ origin: 'http://localhost:3000' }));
// Enable CORS for requests coming from 'http://localhost:3000', allowing the front-end to communicate with the server

app.use(bodyParser.json());
// Parse incoming request bodies in JSON format and make the parsed data available in req.body

// Debug current directory
console.log('Current directory:', __dirname);

// Define file paths
const gamesPath = path.join(__dirname, 'games.json');
const departmentsPath = path.join(__dirname, 'departments.json');

// Log file existence
console.log('Fixed Games file path:', gamesPath);
console.log('Fixed Departments file path:', departmentsPath);
console.log('Games file exists:', fs.existsSync(gamesPath));
console.log('Departments file exists:', fs.existsSync(departmentsPath));



// Define routes
app.use('/register', registerRoute);
// Use the `registerRoute` handler for requests to the '/register' endpoint

app.use('/login', loginRoute);
// Use the `loginRoute` handler for requests to the '/login' endpoint

// Load departments data
let departmentsData = [];
try {
  if (fs.existsSync(departmentsPath)) {
    const departmentsRaw = fs.readFileSync(departmentsPath, 'utf8');
    departmentsData = JSON.parse(departmentsRaw);
  } else {
    console.error('Departments file not found at:', departmentsPath);
  }
} catch (err) {
  console.error('Error loading departments data:', err);
}

app.get('/departments', (req, res) => {
  res.json(departmentsData);
});

app.get('/api/games', (req, res) => {
  try {
    if (!fs.existsSync(gamesPath)) {
      console.error('Games file not found at:', gamesPath);
      return res.status(404).json({ message: 'Games file not found' });
    }

    const data = fs.readFileSync(gamesPath, 'utf8');

    try {
      const gamesData = JSON.parse(data);
      console.log('Games data sent from backend:', gamesData.length, 'games found');
      res.json(gamesData);
    } catch (parseErr) {
      console.error('Error parsing games JSON:', parseErr);
      return res.status(500).json({ message: 'Invalid JSON in games file' });
    }
  } catch (err) {
    console.error('Error reading games.json:', err);
    return res.status(500).json({ message: 'Error reading games data: ' + err.message });
  }
});


// Add an endpoint to show all possible locations
app.get('/api/debug-paths', (req, res) => {
  const testPaths = [
    path.join(__dirname, 'json', 'games.json'),
    path.join(__dirname, 'backend', 'games.json'),
  ];

  const results = testPaths.map(p => ({
    path: p,
    exists: fs.existsSync(p),
    relative: path.relative(__dirname, p)
  }));

  res.json({
    currentDir: __dirname,
    paths: results
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));