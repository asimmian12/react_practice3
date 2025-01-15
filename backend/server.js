const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));


const db = mysql.createConnection({
  host: 'localhost',
  user: 'asim',
  password: 'Sajid365',
  database: 'react'
});


app.post('/Register', (req, res) =>{
  const sql = "INSERT INTO users 'ID', 'FullName', 'Email', 'Password') VALUES (?)";
  const values = [
    req.body.name,
    req.body.email,
    req.body.password,
  ]
  db.query(sql, [values], (err, data) =>{
    if(err){
      return res.json("error");
    }
    return res.json(data);
  });
})


app.listen('8081', () =>{
  console.log("listening");
})



// db.connect((err) => {
//   if (err) {
//     console.error('Error connecting to MySQL ' + err.stack);
//     return;
//   }

//   console.log('Connected to MySQL as ID ' + connection.threadId);
// });
