var express = require('express');
var socket = require('socket.io');

//App setup
var app = express();
var server = app.listen(process.env.PORT || 4000, function(){
  console.log('Porta 4000 in ascolto');
});

var allEmittedM = [];
var index = 0;

//Static files
app.use(express.static('public'));

//Sockets setup
var io = socket(server);

io.on('connection', function(socket){
  console.log(socket.id + ' si è connesso');

  for (var i = 0; i < allEmittedM.length; i++) {
    socket.emit('update', allEmittedM[i]);
  }

  socket.on('update', function(data){
    allEmittedM[index] = data;
    index++;
    console.log('Sfida: ' + data[0] + ' : ' + data[1] + ' | T1: ' + data[2] + ' T2: ' + data[3]);
    io.sockets.emit('update', data);
  });

  socket.on('disconnect', function(){
    console.log(socket.id + ' si è disconnesso');
  });
});
