function onConnect(socket){
  socket.emit('hello', { msg: 'hello from server' });
  require('../app/controllers/home.js').register(socket);
}

function onDisconnect(socket) {
}

module.exports = function (io) {

  io.on('connection', function (socket) {
    onConnect(socket);
    console.info('new user has connected');
  });

  io.on('disconnect', function (socket) {
    onDisconnect(socket);
    console.info('user has disconnected');
  });

};

