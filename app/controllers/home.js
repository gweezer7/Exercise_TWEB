var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Poll = mongoose.model('Poll');

module.exports = function (app) {
  app.use('/', router);
};


router.get('/', function (req, res, next) {
  Poll.find(function (err, polls) {
    if (err) return next(err);
    res.render('index', {
      title: 'GEMME MON CLAN',
      polls: polls
    });
  });
});



module.exports.register = function (socket) {

  socket.on('hello', function (data) {
    console.log(data);
  });

  socket.on('initRequest', function () {
    Poll.findOne({title : "TWEB"}, "labels data").exec(function(err, poll) {
      socket.emit("initResponse", {labels : poll.labels, data : poll.data});
    });
  });

  socket.on('vote', function (vote) {
    Poll.findOne({title : "TWEB"}, "labels data").exec(function(err, poll) {
      var newData = poll.data;
      newData[poll.labels.indexOf(vote.vote)] += 1;
      Poll.update({title : "TWEB"}, {data : newData}).exec();
      console.log(vote);
      socket.broadcast.emit('vote', {votes : newData});
      socket.emit('vote', {votes : newData});
    });
  });

  socket.on('reset', function(){
    var newData = [0, 0, 0];
    Poll.update({title : "TWEB"}, {data : newData}).exec();
    socket.broadcast.emit('vote', {votes : newData});
    socket.emit('vote', {votes : newData});
  })
};
