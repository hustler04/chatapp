const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = new Schema({
    text: { type: String, required: true },
    senderId: { type: String, required: true },
    recipientId: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema, 'messages');
module.exports = Message;
