const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

const Messages = require('../schemas/messagesSchema.js')

const messagesRouter = express.Router();

dotenv.config();

mongoose.connect(process.env.MONGO, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})

messagesRouter.post('/create', (req, res) => {
  const message = req.body

  Messages.create(message, (err, data) => {
    if (err) {
      res.status(404).send()
    } else {
      res.status(201).send(data)
    }
  })
})

messagesRouter.post('/receive/:id', (req, res) => {
  const {id} = req.params

  Messages.find({"room_id": id}, (err, data) => {
    if (err) {
      res.status(404).send(err)
    } else {
      res.status(201).send(data)
    }
  })
})

module.exports = messagesRouter