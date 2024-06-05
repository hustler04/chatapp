const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const connectToMongoDB = require('./db');
const userRoutes = require('./routes/users');
const messageRoutes = require('./routes/message');
const Message = require('./models/messageSchema');

const app = express();
const PORT = process.env.PORT || 8000;

const server = http.createServer(app);
const io = new Server(server);

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const startServer = async () => {
    try {
        await connectToMongoDB();

        app.use('/users', userRoutes);
        app.use('/message', messageRoutes);

        app.get('/', (req, res) => {
            res.send('Hello');
        });

        // Socket.IO connection
        io.on('connection', (socket) => {
            console.log('A user connected');

            socket.on('disconnect', () => {
                console.log('A user disconnected');
            });

            // Listen for chat messages
            socket.on('chat message', async (msg) => {
                const newMessage = new Message({
                    text: msg.text,
                    senderId: msg.senderId,
                    recipientId: msg.recipientId
                });

                await newMessage.save();
                io.emit('chat message', msg);
            });
        });

        server.listen(PORT, () => {
            console.log(`Server is running at port ${PORT}`);
        });
    } catch (err) {
        console.log('Failed to connect to MongoDB');
        process.exit(1);
    }
};

startServer();
