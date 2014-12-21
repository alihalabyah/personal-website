var http = require('http');
var path = require('path');
var express = require('express');
var compress = require('compression');
var app = express();

//
// Middleware
//
app.use(compress());
app.use(express.static(__dirname + '/dist'));
app.set('views', path.join(__dirname, '/dist/views'));
app.set('view engine', 'jade');

//
// Routes for individual files
//
app.get('/cv',             function(req, res) { res.sendfile('./cv.pdf');  });

//
// Different html routes
//
app.get('/terminal',       function(req, res) { res.render('terminal');   });
app.get('/I-said-hey',     function(req, res) { res.render('heman');      });
app.get('/pretty-rain',    function(req, res) { res.render('rainfall');   });
app.get('/vim-cheatsheet', function(req, res) { res.render('vim');        });
app.get('/typewriter',     function(req, res) { res.render('typewriter'); });
app.get('/walkway',        function(req, res) { res.render('walkway');    });


//
// The 404 Route (ALWAYS Keep this as the last route)
// Serves index route
//
app.get('*', function(req, res){
  res.render('index');
});

//
// Create the server
//
http.createServer(app).listen(process.env.PORT || 9000);
console.log('Listening on port 9000');
