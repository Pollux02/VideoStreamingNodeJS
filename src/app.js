const express = require('express');
const app = express();

const http = require('http').Server(app);

const io = require('socket.io')(http);

//routes
app.use(require('./routes/videoStreaming.routes'));

//index.html
app.use(express.static(__dirname+"/public"));

io.on('connection', (socket) => {
    socket.on('stream', (image) => {
        //stream event to every connected socket
        socket.broadcast.emit('stream', image);
    })
})

module.exports = http;