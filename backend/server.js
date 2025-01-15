const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());


const db = mysql.createConnection({
  host: 'localhost',
  user: 'asim',
  password: 'Sajid365',
  database: 'react'
});

app.post('/')


// db.connect((err) => {
//   if (err) {
//     console.error('Error connecting to MySQL ' + err.stack);
//     return;
//   }

//   console.log('Connected to MySQL as ID ' + connection.threadId);
// });
