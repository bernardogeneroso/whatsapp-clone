const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const socketIO = require('socket.io')
const dotenv = require('dotenv')

const Messages = require('./schemas/messagesSchema.js')
const Routes = require('./routes/index.js')
//app config
const app = express()

dotenv.config();
app.use(express.json());
app.use(cors())
app.use(Routes)

const port = process.env.PORT || 3333

// app listen
const server = app.listen(port, () => console.log('🚀 | Server started on port 3333'))

const io = socketIO(server, {
  cors: {
    origin: '*',
  }
});

mongoose.connect(process.env.MONGO, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})

//Sockets
io.on("connection", (socket) => {
  socket.on('leaveRoom', (room_id) => {
    socket.leave("room"+room_id);
  })

  socket.on('newRoom', (room_id) => {
    socket.join("room"+room_id);
  })

  socket.on('newMessage', (message) => {
    Messages.create(message, (err, data) => {
      if (!err) {
        io.to("room"+data.room_id).emit('messageRoom', data);
      }
    })
  })
});

module.exports = app