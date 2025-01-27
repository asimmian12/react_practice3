const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');


const registerRoute = require('./routes/json/Register');
const loginRoute = require('./routes/json/Login');


dotenv.config();

const app = express();


app.use(cors({ origin: 'http://localhost:3000' })); 
app.use(bodyParser.json());

app.use('/register', registerRoute);
app.use('/login', loginRoute);

const departments = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'routes', 'json', 'departments.json'), 'utf-8')
  );
  

app.get('/departments', (req, res) => {
  res.json(departments); 
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
