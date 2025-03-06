const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const router = express.Router();

// Correctly define the path to departments.json
const departmentsPath = path.join(__dirname, 'routes', 'json', 'departments.json');

// Load departments.json
let departments;
try {
  departments = JSON.parse(fs.readFileSync(departmentsPath, 'utf8'));
} catch (err) {
  console.error('Error loading departments.json:', err);
  departments = []; // Fallback to an empty array if loading the file fails
}

// Correctly define the path to departments.json
const gamesPath = path.join(__dirname, 'routes', 'json', 'games.json');

// Load departments.json
let games;
try {
  games = JSON.parse(fs.readFileSync(gamesPath, 'utf8'));
} catch (err) {
  console.error('Error loading games.json:', err);
  games = []; // Fallback to an empty array if loading the file fails
}

// Create MySQL connection using environment variables
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'admin',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'hospital',
  port: process.env.DB_PORT || 3306
});

// Test the database connection
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the MySQL database.');
  }
});

// Login route
router.post('/', async (req, res) => {
  const { hospital_number, password } = req.body;

  // Ensure inputs are valid
  if (!hospital_number || !password) {
    return res.status(400).json({ message: 'Hospital number and password are required' });
  }

  const query = 'SELECT * FROM users WHERE hospital_number = ?';
  db.query(query, [hospital_number], async (err, result) => {
    if (err) {
      console.error('Database query error:', err); // Log the error for debugging
      return res.status(500).json({ message: 'Database error' });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = result[0];

    try {
      // Compare the password using bcrypt
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        // Fetch the department details
        const department = departments.find((dept) => dept.id === user.department_id);
        const departmentData = department || { name: 'Unknown', details: 'No details available' };

        // Exclude the password from the response data
        const { password, ...userWithoutPassword } = user;

        // Merge the user data with department data
        const responseData = {
          ...userWithoutPassword,
          ...departmentData,
        };

        // Log the response data for debugging purposes
        console.log('Response Data (Backend):', responseData);

        return res.status(200).json({
          message: 'Login successful',
          user: responseData, // Send this back to the frontend
        });
      } else {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
    } catch (err) {
      console.error('Error during password comparison:', err);
      return res.status(500).json({ message: 'Error during login process' });
    }
  });
});

module.exports = router;
