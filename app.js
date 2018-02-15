// initialize our app and tells plugins from the modules
const express = require('express');
const app = express();
const io = require('socket.io')();

// config code
const PORT = process.env.port || 3000;

// serve static file to the public folder
app.use(express.static('public'));

app.use(require('./routes/index'));
app.use(require('./routes/contact'));
app.use(require('./routes/users'));

// tells app to work at port 3000 (WAMP or MAMP are different)
const server = app.listen(3000, function() {
	console.log('listening on localhost:3000');
});

io.attach(server);

// plug socket.io
io.on('connection', function(socket) {
	console.log('a user has connected');
	io.emit('chat message', { for: 'everyone', message: `${socket.id} user has joined the chat` });

	// listen for a message, and send it
	socket.on('chat message', function(msg) {
		console.log('message: ', msg);

		// send a message event to all users
		io.emit('chat message', { for: 'everyone', message: msg });
	});

	// listen for disconneting
	socket.on('disconnect', function() {
		console.log('a user disconnected');
		msg = `${socket.id} The user has diconnected from chat`;
		io.emit('disconnect message', msg);
	});
});
