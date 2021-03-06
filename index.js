var express = require('express');
var socket = require('socket.io');
const port = 4000;
// App setup 
var app = express();
var server = app.listen(process.env.PORT || port,function(){
    console.log('listening to request on port 4000');
});

//  Static files 
app.use(express.static('public'));

// Socket setup
var io = socket(server);

io.on('connection', (socket) => {

    console.log('made socket connection', socket.id);

    // Handle chat event
    socket.on('chat', function(data){
        // console.log(data);
        io.sockets.emit('chat', data);
    });

    //  Listen when typing
    socket.on('typing',function(data){
        socket.broadcast.emit('typing',data);       
    });

});
