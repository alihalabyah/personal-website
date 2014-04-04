var gzippo = require('gzippo'),
    express = require('express'),
    app = express();

// configure server
app.configure(function() {

  // parses request body and populates request.body
  app.use( express.bodyParser() );

  // check for http overides
  app.use( express.methodOverride() );

  // user for serving static files
  // app.use(express.logger('dev'));
  app.use(express.static(__dirname + "/dist"));

})

app.get('/cv', function(req,res) {
  res.sendfile('./dist/cv.pdf');
});

app.get('/terminal', function(req,res) {
  res.sendfile('./dist/terminal.html');
});

app.get('/I-said-hey', function(req, res) {
  res.sendfile('./dist/heman.html');
})

app.get('/pretty-rain', function(req, res) {
  res.sendfile('./dist/rainfall.html');
})

app.get('/vim-cheatsheet', function(req, res) {
  res.sendfile('./dist/vim.html');
})

app.get('/typewriter', function(req, res) {
  res.sendfile('./dist/typewriter.html');
})

//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', function(req, res){
  res.sendfile('./dist/index.html');
});

app.listen(process.env.PORT || 3000);
console.log('Listening on port 3000');
