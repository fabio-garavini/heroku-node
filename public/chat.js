//Connessione
var socket = io.connect('http://localhost:4000');

//Query DOM
var message = document.getElementById('message'),
    handle = document.getElementById('user'),
    tempo1 = document.getElementById('tempo1'),
    tempo2 = document.getElementById('tempo2'),
    btn = document.getElementById('send'),
    output = document.getElementById('output')

//Emit event
btn.addEventListener('click', function(){
  socket.emit('update', [handle.value, message.value, tempo1.value, tempo2.value]);
});


//Listen for events
socket.on('update', function(data){
  output.innerHTML += '<p><strong>' + data[0] + ' : </strong> ' + data[1] + ' | T1: ' + data[2] + ' T2: ' + data[3] + '</p>';
});
