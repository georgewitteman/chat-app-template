// index.js -- The main app file

// Our required libraries and global variables
var express = require('express');
var port = process.env.PORT || 3000;

// Create our server
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// Files in the `public/` directory served statically
app.use(express.static('public'));

// When a user goes to the root url send them to index.html
app.get('/', function redirectHomepage(req, res) {
  res.redirect(301, '/index.html');
});

// Listen for socket.io connections
io.on('connection', function listenForIOConnections(socket){
  // When a user types in a message...
  socket.on('chat message', function emitMessage(msg){
    // ...send that message to other connected users
    io.emit('chat message', msg);
  });
});

// Wait for users to come to our app
http.listen(port, function startServer(){
  // Log our apps URL
  console.log('Listening on http://localhost:' + port);
});
