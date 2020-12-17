const express = require('express')
const mysql = require('mysql')

const mysqlConnection = require('../../mysql.js')

const con = mysql.createConnection(mysqlConnection);
const usersRouter = express.Router();

usersRouter.get('/all', (req, res) => {
  try {
    con.query("SELECT * FROM users;", function (err, result) {
      return res.status(201).send(result)
    })
  } catch (err) {}
})

usersRouter.post('/create', (req, res) => {
  const {name, email, password} = req.body

  try {
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
  } catch (err) {}
})

usersRouter.post('/sessions', (req, res) => {
  const {email, password} = req.body

  try {
    con.query(`SELECT * FROM users WHERE email='${email}' AND password='${password}';`, function (err, result) {
      if (result[0]) {
        return res.status(200).send({
          user: result[0]
        })
      } else {
        return res.status(404).send()
      }
    });
  } catch (err) {}
})

module.exports = usersRouter