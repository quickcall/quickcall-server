
/**
 * Module dependencies
 */
var fs = require('fs');
var express = require('express');
var passport = require('passport');
var config = require('config');
// var mongoose = require('mongoose');

var app = express();

var port = process.env.PORT || 3000;


var connect = function () {
  var options = { server: { socketOptions: { keepAlive: 1 } } };
  mongoose.connect(config.db, options);
};
connect();

mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);



var Schema = mongoose.Schema;
/**
 * User schema
 */
var UserSchema = new Schema({
  username: { type: String, required: true, unique: true},
  phonenumber: { type: Number, required: true, unique: true}
  // preferences: {}
});
var User = mongoose.model('User', UserSchema);
new User({username:'test',phonenumber:'test'}).save(function(err,e){
	if(err) {
		return error;
	}
	return e;
});
User.find()
// Bootstrap models
// fs.readdirSync(__dirname + '/app/models').forEach(function (file) {
//   if (~file.indexOf('.js')) require(__dirname + '/app/models/' + file);
// });

// Bootstrap passport config
require('./config/passport')(passport, config);

// Bootstrap application settings
require('./config/express')(app, passport);

// Bootstrap routes
require('./config/routes')(app, passport);

app.listen(port);
console.log('Express app started on port ' + port);
