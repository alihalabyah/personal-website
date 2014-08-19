var http = require('http');
var express = require('express');
var app = express();

//
// Middleware
//
app.use(express.compress());
app.use(express.static(__dirname + '/dist'));

//
// Routes for individual files (that aren't html)
//
app.get('/cv', function(req,res) { res.sendfile('./dist/cv.pdf'); });

//
// Different html routes
//
app.get('/terminal', function(req,res) { res.sendfile('./dist/terminal.html'); });
app.get('/I-said-hey', function(req, res) { res.sendfile('./dist/heman.html'); });
app.get('/pretty-rain', function(req, res) { res.sendfile('./dist/rainfall.html'); });
app.get('/vim-cheatsheet', function(req, res) { res.sendfile('./dist/vim.html'); });
app.get('/typewriter', function(req, res) { res.sendfile('./dist/typewriter.html'); });
app.get('/mother', function(req, res) { res.sendfile('./dist/mother.html'); });
app.get('/animate', function(req, res) { res.sendfile('./dist/animate.html'); });

//
// The 404 Route (ALWAYS Keep this as the last route)
//
app.get('*', function(req, res){
  res.sendfile('./dist/index.html');
});

//
// Create the server
//
http.createServer(app).listen(process.env.PORT || 3000);
console.log('Listening on port 3000');
