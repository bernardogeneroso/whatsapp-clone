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

  socket.on('leaveRoom', (room_id) => {
    //console.log('Leave room_id:', room_id)
    socket.leave('room-'+room_id, () => {
      let rooms = Object.keys(socket.rooms);
      console.log(rooms); // [ <socket.id>, 'room 237' ]
    })
  })

  socket.on('newRoom', (room_id) => {
    //console.log('Room_id:', room_id)
    socket.join('room-'+room_id, () => {
      let rooms = Object.keys(socket.rooms);
      console.log(rooms[1]); // [ <socket.id>, 'room 237' ]
    })
  })

  socket.on('newMessage', (message) => {
    Messages.create(message, (err, data) => {
      if (err) {
        console.log(err)
      } else {
        console.log(data, data.room_id)
        console.log(socket.rooms[0])
        
        let rooms = Object.keys(socket.rooms);
        console.log(rooms[1]);

        io.to(rooms[1]).emit('messageRoom', data)
        //socket.emit('messageRoom', data)
        //socket.in('room'+data.room_id.toString()).emit('messageRoom', data)
        //console.log(data, data.room_id.toString())
        //socket.to('room-'+data.room_id.toString()).emit('messageRoom', data);
        //io.in('room-'+data.room_id).emit('messageRoom', data)
        
      }
    })
  })

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});


module.exports = messagesRouter