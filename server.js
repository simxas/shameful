var express  = require('express');
var app      = express();
var app      = express();
var port     = process.env.PORT || 8080;
var morgan       = require('morgan');
var bodyParser   = require('body-parser');
var path 	 = require('path');
var jsonfile = require('jsonfile')
var util = require('util')

//==========================
app.use(morgan('dev'));
app.use( bodyParser.json() );       
app.use(bodyParser.urlencoded({     
  extended: true
})); 
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use(express.static(path.join(__dirname, 'views')));


app.listen(port);
console.log('The magic happens on port ' + port);