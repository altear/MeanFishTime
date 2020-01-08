
/*
 * EXPRESS
 */
const express = require('express')
const app = express()
const port = 3000

var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.use(express.static('public'))

io.on('connection', function(socket){
  console.log('a user connected');
});

http.listen(port, function(){
  console.log('listening on *:3000');
});

/*
 * TCP CLIENTS
 */
var net = require('net');

data_group = []

// TODO: consider creating batches of data, client can then create a queue of updates after each batch loads
var data_server = net.createServer(function(socket) {
	socket.on('data', (data)=>{
      data_group.push({y: data.toString(), x: Date.now()})
      if (data_group.length == 100) {
        io.emit('data', JSON.stringify(data_group))
        data_group = []
      }
    })
});
data_server.listen(12345, '127.0.0.1');

let ticks = 0;
var tick_server = net.createServer(function(socket) {
	socket.on('data', (data)=>{
      ticks += 1
      io.emit('tick', ticks)
    })
});

tick_server.listen(12346, '127.0.0.1');

