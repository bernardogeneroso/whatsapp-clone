const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

const Routes = require('./routes/index.js')

//app config
const app = express()

dotenv.config();
app.use(express.json());
app.use(cors())
app.use(Routes)

const port = process.env.PORT || 3333

// app listen
app.listen(port, () => console.log('🚀 | Server started on port 3333'))

module.exports = app