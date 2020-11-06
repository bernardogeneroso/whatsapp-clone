const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

const Routes = require('./routes/index.js')

//app config
const app = express()

dotenv.config();
app.use(express.json());
app.use(cors())
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.use(Routes)

const port = process.env.PORT || 3333

// app listen
app.listen(port, () => console.log('🚀 | Server started on port 3333 && Socker started on port 3334'))

module.exports = app