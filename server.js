var express = require('express');
var path = require('path');
var app = express();

var bodyparser = require('body-parser');
app.use(bodyparser.urlencoded());
app.use(bodyparser.json());

require('./config/mongoose.js');
require('./config/routes.js')(app);

app.use(express.static(path.join(__dirname,'./client')));
app.listen(8000, function(){
	console.log('blackbelt1 on port 8000');
})