const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const io = require('socket.io')(3334)

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

//Sockets
io.on("connection", (socket) => {
  console.log("New client connected");
  
  socket.on('newMessage', (message) => {
    Messages.create(message, (err, data) => {
      if (err) {
        console.log(err)
      } else {
        console.log(data)
        socket.broadcast.emit('messageRoom', data)
      }
    })
  })

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});


module.exports = messagesRouter