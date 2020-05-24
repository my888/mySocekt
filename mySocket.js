const express = require('express');
const http = require('http');
const socket = require('socket.io');

const port = process.env.PORT || 31668

var app = express();
const server = http.createServer(app)
const io = socket(server)

app.use(express.static(__dirname + "/"));

io.on('connection', function (socket) {
    console.log(' connected ' + socket.id);

    socket.on('login', function (msg) {
    	console.log(msg  + ' connected ' + socket.id);
        socket.join(msg);
    })

    socket.on('move', function (msg) {
        socket.broadcast.emit('move', msg);
        // socket.to(msg.msgTo).emit('move', msg);
        console.log(msg.from);
    });

    socket.on('start', function(msg) {
        console.log('start');
        socket.broadcast.emit('start', msg);
    })

    socket.on('paired', function(msg) {
        console.log('paired');
        socket.to(msg.msgTo).emit('paired', msg);
    })

});

server.listen(port);
console.log('Connected');
