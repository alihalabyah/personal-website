var gzippo = require('gzippo'),
	  express = require('express'),
	  app = express();

app.use(express.logger('dev'));
app.use(gzippo.staticGzip(__dirname + "/dist"));

// configure server
app.configure(function() {

	// parses request body and populates request.body
	app.use( express.bodyParser() );

	// check for http overides
	app.use( express.methodOverride() );

})

// dev routes
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

//   //The 404 Route (ALWAYS Keep this as the last route)
//   app.get('*', function(req, res){
//     res.sendfile('./app/index.html');
//   });

// }

app.get('/about', function(req,res) {
  res.sendfile('./dist/about.html');
});

app.get('/cv', function(req,res) {
	console.log('cv file route...');
  res.sendfile('./dist/connor_atherton_cv.pdf');
});

app.get('/presentation', function(req,res) {
  console.log('306 presentation route...');
  res.sendfile('./dist/presentation.html');
});

//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', function(req, res){
  res.sendfile('./dist/index.html');
});

app.listen(process.env.PORT || 3000);
console.log('Listening on port 3000');
