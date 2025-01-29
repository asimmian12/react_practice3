// Import necessary modules
const express = require('express'); // Express framework for routing and middleware
const mysql = require('mysql2'); // MySQL library for interacting with the database
const bcrypt = require('bcrypt'); // Library for hashing passwords securely
require('dotenv').config(); // Load environment variables from a .env file

const router = express.Router(); // Create an Express router to handle routes

// Create a MySQL connection
const db = mysql.createConnection({
    host: process.env.DB_HOST, // Database host (from environment variables)
    user: process.env.DB_USER, // Database user (from environment variables)
    password: process.env.DB_PASSWORD, // Database password (from environment variables)
    database: process.env.DB_NAME, // Database name (from environment variables)
    port: process.env.DB_PORT, // Database port (e.g., 8889 for MAMP MySQL)
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

// POST route to handle user registration
router.post('/', async (req, res) => {
    // Extract user details from the request body
    const { firstName, surname, hospital_number, email, department_id, telephone_number, password, dob } = req.body;

    try {
        // Hash the user's password before storing it in the database
        const hashedPassword = await bcrypt.hash(password, 10); 
        // 10 is the number of salt rounds (higher values are more secure but slower)

        // SQL query to insert the user's data into the `users` table
        const query = `
            INSERT INTO users (firstName, surname, hospital_number, email, department_id, telephone_number, password, dob)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

        // Execute the SQL query, passing the user data as parameters to prevent SQL injection
        db.query(query, [firstName, surname, hospital_number, email, department_id, telephone_number, hashedPassword, dob], (err, result) => {
            if (err) {
                console.error('Error during registration:', err); 
                // Log the error if the query fails
                return res.status(500).json({ message: 'Error during registration' }); 
                // Return a 500 status code with an error message
            }
            // Return a success message with a 201 status code if registration is successful
            res.status(201).json({ message: 'Registration successful!' });
        });
    } catch (error) {
        console.error('Error hashing the password:', error); 
        // Log an error if password hashing fails
        return res.status(500).json({ message: 'Error processing password' }); 
        // Return a 500 status code with an appropriate error message
    }
});

// Export the router
module.exports = router; 
// Export the router to be used in the main application
