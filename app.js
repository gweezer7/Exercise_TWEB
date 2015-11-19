
var
  express = require('express'),
  config = require('./config/config'),
  glob = require('glob'),
  mongoose = require('mongoose'),
  app = express(),
  http = require('http').Server(app),
  io = require('socket.io')(http);

mongoose.connect(config.db);
var db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + config.db);
});

var models = glob.sync(config.root + '/app/models/*.js');
models.forEach(function (model) {
  require(model);
});

require('./config/express')(app, config);
require('./config/socket')(io);

Poll = mongoose.model('Poll');

http.listen(config.port, function () {
  console.log('Express server listening on port ' + config.port);
  Poll.remove({}, function() {});
  Poll.create({
    title : "TWEB",
    labels : ["YES", "NOT SURE", "NO"],
    data : [0, 0, 0]
  });
});

