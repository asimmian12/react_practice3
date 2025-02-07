const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const { details } = require('framer-motion/client');
require('dotenv').config();

const router = express.Router();

// Load departments.json
const departments = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'json', 'departments.json'), 'utf-8')
);

const db = mysql.createConnection({
  host: 'localhost',
  user: 'admin',
  password: 'password', 
  database: 'hospital',
  port: 3306
});

// Test the connection
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the MySQL database.');
  }
});

// Login route
router.post('/', (req, res) => {
  const { hospital_number, password } = req.body;

  const query = 'SELECT * FROM users WHERE hospital_number = ?';
  db.query(query, [hospital_number], async (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = result[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const department = departments.find((dept) => dept.id === user.department_id);
      const departmentData = department || {name: 'Unknown', details: 'No details available'};


      // Remove password and prepare user data
      const { password, ...userWithoutPassword } = user;

      // Prepare response data
      const responseData = {
        ...userWithoutPassword,
        ...departmentData,
      };

      // Log the response data in the backend
      console.log('Response Data (Backend):', responseData);  // <-- Log the user data with department

      return res.status(200).json({
        message: 'Login successful',
        user: responseData,  // Send this back to the frontend
      });
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  });
});


module.exports = router;
