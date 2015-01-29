var express = require('express');
var app = express();
var server = require('http').Server(app);
var jade = require('jade');
var io = require('socket.io')(server);

//Express serves views telling them where the views are
app.set('views', __dirname + '/views');
//telling express what we are going to use for views
app.set('view engine', 'jade');
//turning off the default express layout
app.set("view options", { layout: false });
app.use(express.static(__dirname +'/public'));
//telling express the file that needs to be servered
app.get('/', function(req, res){
	res.render('home.jade');
});
//running the app on this port
server.listen(4000);
var nickNames = {};
var numUsers = 0;
//initializing config
io.sockets.on('connection', function(socket) {
  var addedUser = false;
//get the message the use types
  socket.on('setNickName', function(nickName){
    socket.nickName = nickName;

    nickNames[nickName] = nickName;
    ++numUsers;
    addedUser = true;
  });
//send the message to other users
  socket.on('message', function(data) {
    socket.broadcast.emit('message', {
      nickName: socket.nickName,
      message: data
    });
//      var data = { 'message' : message, nickName : name};
  //    io.sockets.emit('message', data);
    //  console.log("user " + name + " send this: " + message);    
  });
});
