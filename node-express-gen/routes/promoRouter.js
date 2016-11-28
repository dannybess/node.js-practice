var express = require('express');
var bodyParser = require('body-parser');
var promoRouter = express.Router();
promoRouter.use(bodyParser.json());
// Route and handle all /dishes requests for Get, Post, and Delete
promoRouter.route('/')
.all(function(req, res, next) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	next();
})

.get(function(req, res, next) {
	res.end('Will send all the promotions to you!');
})

.post(function(req, res, next) {
	res.end('Will add the promotions:' + req.body.name + 'with details:' + req.body.description);
})

.delete(function(req, res, next) {
	res.end('Deleting all promotions');
});

// Route and handle all /:dishId requests for Get, Post, Put, and Delete
promoRouter.route('/:id')
.all(function(req,res,next) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	next();
})
.get(function(req,res,next) {
	res.end('Will send details of the promotion: ' + req.params.id  + ' to you!');
})
.put(function(req,res,next) {
	res.write('Updating the promotion: ' + req.params.id  + '\n');
	res.end('Will update the promotion: ' + req.body.name + ' with details: ' +
		req.body.description);
})
.delete(function(req,res,next) {
	res.end('Deleting promotion: ' + req.params.id );
});

module.exports = promoRouter;