import express from 'express'
import cors from 'cors'
import mysql from 'mysql'

import mysqlConnection from '../mysql.js'

//app config
const app = express()
app.use(express.json());
app.use(cors())

const port = process.env.PORT || 3333

// mysql conection
const con = mysql.createConnection(mysqlConnection);

// api routes
app.get('/', (req, res) => {
  res.status(200).json({test: "Hello World"})
})

// Users
app.get('/users/all', (req, res) => {
  con.query("SELECT * FROM users;", function (err, result) {
    return res.status(201).send(result)
  });
})

app.post('/users/create', (req, res) => {
  const {name, email, password} = req.body

  con.query(`INSERT INTO users (name, email, password) VALUES ('${name}', '${email}', '${password}')`, function(err, result) {
    if (err && err.errno === 1062) return res.status(400).send({
      error: err.sqlMessage
    }) 
    else if(err) {
      return res.status(400).send({
        error: err.sqlMessage
      }) 
    }

    const user = {
      id: result.insertId,
      name,
      email,
      password,
      image: null
    }

    return res.status(201).send(user)
  })
})

app.get('/users/find', (req, res) => {
  const {email, password} = req.body

  con.query(`SELECT * FROM users WHERE email='${email}' AND password='${password}';`, function (err, result) {
    if (result[0]) {
      return res.status(200).send(result)
    } else {
      return res.status(404).send()
    }
  });
})

// Rooms
app.get('/rooms', (req, res) => {
  con.query("SELECT * FROM rooms;", function (err, result) {
    res.status(201).send(result)
  });
})

app.get('/rooms/:id', (req, res) => {
  const {id} = req.params

  con.query(`SELECT rooms.name, rooms.chat_description, rooms.image FROM users_rooms, rooms WHERE users_rooms.id_users = '${id}' AND rooms.id = users_rooms.id_rooms`, function (err, result) {
    if (err) return res.status(400).send({
      error: err
    });

    if (result[0]) {
      return res.status(200).send(result)
    } else {
      return res.status(404).send()
    }
  })
})

// app listen
app.listen(port, () => {
  console.log(`Server OK, on port ${port}`)
})

export default app