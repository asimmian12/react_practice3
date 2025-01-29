// Import necessary modules
const express = require('express'); // Express framework for routing and middleware
const mysql = require('mysql2'); // MySQL library for connecting to the database
const bcrypt = require('bcrypt'); // Library for hashing and comparing passwords
const fs = require('fs'); // File system module for reading files
const path = require('path'); // Module for working with file and directory paths
require('dotenv').config(); // Load environment variables from a .env file

const router = express.Router(); // Create a new Express router for handling routes

// Load departments.json
const departments = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'json', 'departments.json'), 'utf-8')
); 
// Synchronously read and parse the contents of departments.json file into a JavaScript object

// Create a MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST, // Database host from environment variables
  user: process.env.DB_USER, // Database user from environment variables
  password: process.env.DB_PASSWORD, // Database password from environment variables
  database: process.env.DB_NAME, // Database name from environment variables
  port: process.env.DB_PORT, // Database port from environment variables
});

// Test the connection to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err); 
    // Log an error if the connection fails
  } else {
    console.log('Connected to the MySQL database.'); 
    // Log success if the connection is established
  }
});

// Login route
router.post('/', (req, res) => {
  const { hospital_number, password } = req.body; 
  // Extract hospital_number and password from the request body

  const query = 'SELECT * FROM users WHERE hospital_number = ?'; 
  // SQL query to find a user by their hospital_number

  db.query(query, [hospital_number], async (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' }); 
      // Return a 500 status with an error message if there's a database issue
    }

    if (result.length === 0) {
      return res.status(404).json({ message: 'User not found' }); 
      // Return a 404 status if no user is found with the given hospital_number
    }

    const user = result[0]; 
    // Extract the user data (assuming one user per hospital_number)

    const isMatch = await bcrypt.compare(password, user.password); 
    // Compare the provided password with the hashed password in the database

    if (isMatch) {
      const department = departments.find((dept) => dept.id === user.department_id); 
      // Find the department details based on the user's department_id
      
      const departmentData = department || { name: 'Unknown', details: 'No details available' }; 
      // Use default values if the department is not found

      // Remove the password from the user object for security
      const { password, ...userWithoutPassword } = user; 

      // Prepare the response data by merging user details and department information
      const responseData = {
        ...userWithoutPassword,
        ...departmentData,
      };

      // Log the response data in the backend for debugging purposes
      console.log('Response Data (Backend):', responseData);

      return res.status(200).json({
        message: 'Login successful', 
        user: responseData, // Return user data along with department information
      });
    } else {
      return res.status(401).json({ message: 'Invalid credentials' }); 
      // Return a 401 status if the password comparison fails
    }
  });
});

// Export the router
module.exports = router; 
// Export the router to be used in the main application
