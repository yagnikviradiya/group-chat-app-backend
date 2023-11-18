const mongoose = require('mongoose');

// Message model
const messageSchema = new mongoose.Schema({
  group: { type: String, required: true },
  sender: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
