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
  app.use(express.static(__dirname + "/dist"));

})

// // dev routes
// if (app.get('env') === 'development') {

//   // set static file directory
//   app.use(gzippo.staticGzip(__dirname + "/app"));

//   app.get('/about', function(req,res) {
//     res.sendfile('./app/playground.html');
//   });

//   app.get('/cv', function(req,res) {
//     console.log('cv file route...');
//     res.sendfile('./app/connor_atherton_cv.pdf');
//   });

//   app.get('/contact', function(req,res) {
//     res.sendfile('./app/contact.html');
//   });

//   app.get('/presentation', function(req,res) {
//     console.log('306 presentation route...');
//     res.sendfile('./app/presentation.html');
//   });

//   app.get('/he-man', function(req, res) {
//     console.log('he man route');
//     res.sendfile('./app/heman.html');
//   })

//   app.get('/pretty-rain', function(req, res) {
//     console.log('rainroute');
//     res.sendfile('./app/rainfall.html');
//   })

//   //The 404 Route (ALWAYS Keep this as the last route)
//   app.get('*', function(req, res){
//     res.sendfile('./app/index.html');
//   });

// }

app.get('/about', function(req,res) {
  res.sendfile('./dist/about.html');
});

app.get('/cv', function(req,res) {
  res.sendfile('./dist/connor_atherton_cv.pdf');
});

app.get('/presentation', function(req,res) {
  res.sendfile('./dist/presentation.html');
});

app.get('/I-said-hey', function(req, res) {
  res.sendfile('./dist/heman.html');
})

app.get('/pretty-rain', function(req, res) {
  console.log('rainroute');
  res.sendfile('./dist/rainfall.html');
})

//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', function(req, res){
  res.sendfile('./dist/index.html');
});

app.listen(process.env.PORT || 3000);
console.log('Listening on port 3000');
