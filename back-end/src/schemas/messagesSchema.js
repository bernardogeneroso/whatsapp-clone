const mongoose = require('mongoose')

const messageSchema = mongoose.Schema({
  message: String,
  username: String,
  timestamp: String,
  room_id: Number
})

module.exports = mongoose.model('messageContent', messageSchema)