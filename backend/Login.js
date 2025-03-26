const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const speakeasy = require('speakeasy');
const QRCode = require('qrcode');
require('dotenv').config();

const router = express.Router();

// Correctly define the path to departments.json
const departmentsPath = path.join(__dirname, 'departments.json');

// Load departments.json
let departments;
try {
  departments = JSON.parse(fs.readFileSync(departmentsPath, 'utf8'));
} catch (err) {
  console.error('Error loading departments.json:', err);
  departments = []; // Fallback to an empty array if loading the file fails
}

// Correctly define the path to departments.json
const gamesPath = path.join(__dirname, 'games.json');

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

// Helper function to generate a 2FA secret for a user
const generate2FASecret = (email) => {
  const secret = speakeasy.generateSecret({
    name: `Hospital Portal (${email})`
  });
  return secret;
};

// Endpoint to setup 2FA for a user (should be called after initial login)
router.post('/setup-2fa', async (req, res) => {
  const { hospital_number } = req.body;

  if (!hospital_number) {
    return res.status(400).json({ message: 'Hospital number is required' });
  }

  const query = 'SELECT * FROM users WHERE hospital_number = ?';
  db.query(query, [hospital_number], async (err, result) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ message: 'Database error' });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = result[0];
    const secret = generate2FASecret(user.email);

    // Update user with 2FA secret
    const updateQuery = 'UPDATE users SET two_factor_secret = ? WHERE hospital_number = ?';
    db.query(updateQuery, [secret.base32, hospital_number], (updateErr) => {
      if (updateErr) {
        console.error('Error updating user with 2FA secret:', updateErr);
        return res.status(500).json({ message: 'Error setting up 2FA' });
      }

      // Generate QR code URL for the authenticator app
      QRCode.toDataURL(secret.otpauth_url, (err, data_url) => {
        if (err) {
          console.error('Error generating QR code:', err);
          return res.status(200).json({
            message: '2FA setup initiated',
            secret: secret.base32, // Fallback if QR code generation fails
            manualEntryCode: secret.base32
          });
        }

        return res.status(200).json({
          message: '2FA setup initiated',
          qrCodeUrl: data_url,
          manualEntryCode: secret.base32
        });
      });
    });
  });
});

// Login route with 2FA verification
router.post('/', async (req, res) => {
  const { hospital_number, password, token } = req.body;

  // Ensure inputs are valid
  if (!hospital_number || !password) {
    return res.status(400).json({ message: 'Hospital number and password are required' });
  }

  const query = 'SELECT * FROM users WHERE hospital_number = ?';
  db.query(query, [hospital_number], async (err, result) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ message: 'Database error' });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = result[0];

    try {
      // Compare the password using bcrypt
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Check if 2FA is enabled for this user
      if (user.two_factor_secret) {
        // If token is not provided, request it
        if (!token) {
          return res.status(206).json({ 
            message: '2FA token required',
            twoFactorRequired: true
          });
        }

        // Verify the 2FA token
        const verified = speakeasy.totp.verify({
          secret: user.two_factor_secret,
          encoding: 'base32',
          token: token,
          window: 1 // Allow 1 step (30 seconds) before/after current time
        });

        if (!verified) {
          return res.status(401).json({ message: 'Invalid 2FA token' });
        }
      }

      // Fetch the department details
      const department = departments.find((dept) => dept.id === user.department_id);
      const departmentData = department || { name: 'Unknown', details: 'No details available' };

      // Exclude the password from the response data
      const { password: _, two_factor_secret, ...userWithoutPassword } = user;

      // Merge the user data with department data
      const responseData = {
        ...userWithoutPassword,
        ...departmentData,
      };

      console.log('Response Data (Backend):', responseData);

      return res.status(200).json({
        message: 'Login successful',
        user: responseData,
      });
    } catch (err) {
      console.error('Error during authentication:', err);
      return res.status(500).json({ message: 'Error during login process' });
    }
  });
});

// Endpoint to verify a 2FA token (for testing or alternative flows)
router.post('/verify-2fa', async (req, res) => {
  const { hospital_number, token } = req.body;

  if (!hospital_number || !token) {
    return res.status(400).json({ message: 'Hospital number and token are required' });
  }

  const query = 'SELECT two_factor_secret FROM users WHERE hospital_number = ?';
  db.query(query, [hospital_number], (err, result) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ message: 'Database error' });
    }

    if (result.length === 0 || !result[0].two_factor_secret) {
      return res.status(404).json({ message: 'User not found or 2FA not setup' });
    }

    const secret = result[0].two_factor_secret;
    const verified = speakeasy.totp.verify({
      secret: secret,
      encoding: 'base32',
      token: token,
      window: 1
    });

    if (verified) {
      return res.status(200).json({ message: '2FA token is valid' });
    } else {
      return res.status(401).json({ message: 'Invalid 2FA token' });
    }
  });
});

module.exports = router;