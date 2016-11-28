var express = require('express');
var bodyParser = require('body-parser');
var leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());

// Route and handle all /dishes requests for Get, Post, and Delete
leaderRouter.route('/')
.all(function(req, res, next) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	next();
})

.get(function(req, res, next) {
	res.end('Will send all the leaders to you!');
})

.post(function(req, res, next) {
	res.end('Will add the leaders:' + req.body.name + 'with details:' + req.body.description);
})

.delete(function(req, res, next) {
	res.end('Deleting all leaders');
});

// Route and handle all /:dishId requests for Get, Post, Put, and Delete
leaderRouter.route('/:id')
.all(function(req,res,next) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	next();
})
.get(function(req,res,next) {
	res.end('Will send details of the leader: ' + req.params.id  + ' to you!');
})
.put(function(req,res,next) {
	res.write('Updating the leader: ' + req.params.id + '\n');
	res.end('Will update the leader: ' + req.body.name + ' with details: ' +
		req.body.description);
})
.delete(function(req,res,next) {
	res.end('Deleting leader: ' + req.params.id );
});

module.exports = leaderRouter;// JavaScript Document