const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');  // Import bcrypt
require('dotenv').config(); 

const router = express.Router();

// Create MySQL connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,   
});

// Test the connection
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Connected to the MySQL database.');
    }
});

// POST route to handle user registration
router.post('/', async (req, res) => {
    const { firstName, surname, hospital_number, email, department_id, telephone_number, password } = req.body;

    try {
        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds (higher is more secure, but slower)

        // Create the SQL query to insert user data
        const query = `
            INSERT INTO users (firstName, surname, hospital_number, email, department_id, telephone_number, password)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        // Execute the query
        db.query(query, [firstName, surname, hospital_number, email, department_id, telephone_number, hashedPassword], (err, result) => {
            if (err) {
                console.error('Error during registration:', err);
                return res.status(500).json({ message: 'Error during registration' });
            }
            res.status(201).json({ message: 'Registration successful!' });
        });
    } catch (error) {
        console.error('Error hashing the password:', error);
        return res.status(500).json({ message: 'Error processing password' });
    }
});

module.exports = router;
