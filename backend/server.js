const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Import routes
const registerRoute = require('./routes/json/Register');
const loginRoute = require('./routes/json/Login');

// Configure environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:3000' })); 
app.use(bodyParser.json());

// Routes
app.use('/register', registerRoute);
app.use('/login', loginRoute);

const departments = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'routes', 'json', 'departments.json'), 'utf-8')
  );
  

app.get('/departments', (req, res) => {
  res.json(departments); // Send the contents of the departments.json file
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
