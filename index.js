// index.js -- The main app file

// Our required libraries and global variables
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

// Any files in the ./public directory served statically
// For example: public/index.html gets served as
//              http://localhost:3000/index.html
app.use(express.static('public'));

// Listen for socket.io connections
io.on('connection', function(socket){

  // When a user types in a message...
  socket.on('chat message', function(msg){
    // ...send that message to other connected users
    io.emit('chat message', msg);
  });

});

// Wait for users to come to our app
http.listen(port, function(){
  // Log our apps URL
  console.log('Listening on http://localhost:' + port);
});
