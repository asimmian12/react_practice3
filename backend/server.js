const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'asimMian',
  password: 'Sajid365',
  database: 'react_auth'
});



connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }

  console.log('Connected to MySQL as ID ' + connection.threadId);
});
