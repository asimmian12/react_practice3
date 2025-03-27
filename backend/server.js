// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const mysql = require('mysql2/promise');

const registerRoute = require('./Register');
const loginRoute = require('./Login');

// Configure environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors({ 
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());

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

// Database connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'hospital',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Define routes
app.use('/register', registerRoute);
app.use('/login', loginRoute);

// In your server.js, update CORS configuration:
app.use(cors({ 
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Add proper error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something broke!' });
});

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

// Existing endpoint for JSON departments data
app.get('/departments', (req, res) => {
  res.json(departmentsData);
});

// New endpoint: Get all departments from SQL database
app.get('/api/departments', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM departments');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching departments:', error);
    res.status(500).json({ message: 'Error fetching departments' });
  }
});

// New endpoint: Get enhanced department data (SQL + JSON combined)
app.get('/api/departments/enhanced', async (req, res) => {
  try {
    // Get SQL departments
    const [sqlDepartments] = await pool.query('SELECT * FROM departments');
    
    // Combine with JSON data
    const enhancedDepartments = sqlDepartments.map(sqlDept => {
      const jsonDept = departmentsData.find(d => 
        d.name.toLowerCase() === sqlDept.name.toLowerCase()
      );
      return { ...sqlDept, ...jsonDept };
    });

    res.json(enhancedDepartments);
  } catch (error) {
    console.error('Error fetching enhanced departments:', error);
    res.status(500).json({ message: 'Error fetching enhanced departments' });
  }
});

// New endpoint: Get single enhanced department by ID
app.get('/api/departments/enhanced/:id', async (req, res) => {
  try {
    const [sqlDepartments] = await pool.query(
      'SELECT * FROM departments WHERE id = ?', 
      [req.params.id]
    );
    
    if (sqlDepartments.length === 0) {
      return res.status(404).json({ message: 'Department not found' });
    }

    const sqlDept = sqlDepartments[0];
    const jsonDept = departmentsData.find(d => 
      d.name.toLowerCase() === sqlDept.name.toLowerCase()
    );

    res.json({ ...sqlDept, ...jsonDept });
  } catch (error) {
    console.error('Error fetching department:', error);
    res.status(500).json({ message: 'Error fetching department' });
  }
});

// Doctors endpoints
app.get('/api/doctors', async (req, res) => {
  try {
    const { department_id } = req.query;
    let query = 'SELECT * FROM doctors';
    const params = [];
    
    if (department_id) {
      query += ' WHERE department_id = ?';
      params.push(department_id);
    }
    
    const [rows] = await pool.query(query, params);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({ message: 'Error fetching doctors' });
  }
});

app.get('/api/doctor-availability', async (req, res) => {
  try {
    const { doctor_id } = req.query;
    const [rows] = await pool.query(
      'SELECT * FROM doctor_availability WHERE doctor_id = ?',
      [doctor_id]
    );
    res.json(rows);
  } catch (error) {
    console.error('Error fetching doctor availability:', error);
    res.status(500).json({ message: 'Error fetching availability' });
  }
});

// Appointments endpoints
app.get('/api/appointments', async (req, res) => {
  try {
    const { user_id, doctor_id, date } = req.query;
    let query = 'SELECT * FROM appointments';
    const params = [];
    
    if (user_id) {
      query += ' WHERE user_id = ?';
      params.push(user_id);
    }
    
    if (doctor_id) {
      query += params.length ? ' AND doctor_id = ?' : ' WHERE doctor_id = ?';
      params.push(doctor_id);
    }
    
    if (date) {
      query += params.length ? ' AND date = ?' : ' WHERE date = ?';
      params.push(date);
    }
    
    const [rows] = await pool.query(query, params);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ message: 'Error fetching appointments' });
  }
});

// Debug endpoint to check database connection
app.get('/api/debug/db', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM departments');
    res.json({
      dbConnected: true,
      departments: rows
    });
  } catch (error) {
    res.status(500).json({
      dbConnected: false,
      error: error.message
    });
  }
});

// Debug endpoint to check JSON data
app.get('/api/debug/json', (req, res) => {
  res.json({
    jsonDataLoaded: true,
    departments: departmentsData
  });
});

app.post('/api/appointments', async (req, res) => {
  try {
    const { user_id, doctor_id, department_id, date, time, reason, notes, status } = req.body;
    const [result] = await pool.query(
      'INSERT INTO appointments (user_id, doctor_id, department_id, date, time, reason, notes, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [user_id, doctor_id, department_id, date, time, reason, notes, status || 'booked']
    );
    res.json({ id: result.insertId });
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ message: 'Error creating appointment' });
  }
});

app.patch('/api/appointments/:id', async (req, res) => {
  try {
    const { status } = req.body;
    await pool.query(
      'UPDATE appointments SET status = ? WHERE id = ?',
      [status, req.params.id]
    );
    res.json({ success: true });
  } catch (error) {
    console.error('Error updating appointment:', error);
    res.status(500).json({ message: 'Error updating appointment' });
  }
});

// Database test endpoint
app.get('/api/test-db', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS solution');
    res.json({ success: true, solution: rows[0].solution });
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Existing games endpoint
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

// Debug paths endpoint
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