const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const events = require('./events');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'timeline',
  password : 'password',
  database : 'timeline'
});

connection.connect();

const port = process.env.PORT || 8080;

const app = express()
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({
      extended: true
  }))
  .use(events(connection));

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});