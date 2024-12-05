const ws = require('socket.io');
const setupWebSocket = (server) =>{
  global.wsServer = ws(server);
  global.wsServer.use(require('./verifyJWT'));

  global.wsServer.on('connection', (socket) => {
    
    console.log('New WebSocket connection established.');
    console.log(socket.user , " connected to ws")

    socket.on('message', (message) => {
      console.log('Received:', message);
      socket.emit('message', `Server received: ${message}`);
    });
    
    socket.on('book Table',require('./bookTable'))
    socket.on('disconnect', () => {
      console.log('WebSocket connection closed.');
    });
  });

  console.log('Socket.io server is set up.');
}

module.exports = setupWebSocket;
