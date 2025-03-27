const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

// Create an Express application
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:4000', // Adjust this to your client URL
    methods: ['GET', 'POST'],
  },
});

// Middleware
app.use(cors());

// Socket.IO connection
io.on('connection', (socket) => {
  console.log(`Client connected: ${socket.id}`);

  // Listen for external messages from the client
  socket.on('external_message', (data) => {
    console.log(`Received message from ${socket.id}:`, data.message);
    
    // Optionally, send a response back to the client
    socket.emit('external_message_response', { message: 'Message received!' });
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});