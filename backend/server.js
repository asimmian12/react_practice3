const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());


const db = mysql.createConnection({
  host: 'localhost',
  user: 'asimMian',
  password: 'Sajid365',
  database: 'react_auth'
});



// db.connect((err) => {
//   if (err) {
//     console.error('Error connecting to MySQL ' + err.stack);
//     return;
//   }

//   console.log('Connected to MySQL as ID ' + connection.threadId);
// });
