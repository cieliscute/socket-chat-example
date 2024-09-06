const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
// socket io
const { Server } = require('socket.io');

const app = express();
const server = createServer(app, {
  connectionStateRecovery: {} 
});
// socket io
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

// socket io start
io.on('connection', (socket) => {
  console.log('a user connected');

  // chat message event
  socket.on('chat message', (msg) => {
    // console.log('message: ' + msg);   // 顯示收到的訊息
    io.emit('chat message', msg);
  });

  // socket io end
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});
