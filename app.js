var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(express.static(__dirname + '/node_modules'));
app.get('/', function(req, res, next) {
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(client) {
  console.log('Client connected...');

  // Join a camera or app room depending on device
  client.on('room', function(room) {
    client.join(room);
    console.log('Client has joined ' + room + ' room');
  });

	// User has armed the system
	// Receive an event from the app and send an event to the camera
	client.on('arm', function(room) {
		console.log('App has armed system')
		io.in('camera').emit('camera_armed', 'Camera has been armed');
	});

	// User has disarmed the system
	// Receive an event from the app and send an event to the camera
	client.on('disarm', function(room) {
		console.log('App has disarmed system')
		io.in('camera').emit('camera_disarmed', 'Camera has been disarmed');
	});
});

server.listen(3000);
//TO-DO

// Raspberry Pi senses motion
// Receive an event from the camera and send an event to the app

// Camera has connected
// Receive an event from the camera and send an event to the app

// Camera has disconnected
// Receive an event from the camera and send an event to the app
