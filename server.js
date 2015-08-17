var express  = require('express');
var app      = express();
var app      = express();
var port     = process.env.PORT || 8080;
var morgan       = require('morgan');
var bodyParser   = require('body-parser');
var path 	 = require('path');
var jsonfile = require('jsonfile')
var util = require('util')

app.use(morgan('dev'));
app.use( bodyParser.json() );       
app.use(bodyParser.urlencoded({     
  extended: true
})); 
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use(express.static(path.join(__dirname, 'views')));


var file = 'views/data.json';

app.post('/post', function(req, res) {
	var obj = {
			item: {
				id: 123,
				title: req.body.title,
				description: req.body.description,
				dealerInternalNotes: req.body.internalNotes,
				material: {
					description: req.body.selectMaterial,
					restricted: req.body.restricted
				},
				measurement: {
					unit: req.body.inches,
					unit: req.body.centimeters,
					shape: req.body.rectangular,
					shape: req.body.circular,
					length: req.body.length,
					depth: req.body.depth,
					height: req.body.height,
					diameter: req.body.diameter
				},
				condition: {
					description: req.body.distressed,
					description: req.body.fair,
					description: req.body.good,
					description: req.body.excellent
				}
			}
    };
    jsonfile.writeFile(file, obj, function (err) {
  		console.error(err)
	});
	console.log("Pareina shape is formos: "+req.body.shape);

	res.redirect('/');


});


app.listen(port);
console.log('The magic happens on port ' + port);