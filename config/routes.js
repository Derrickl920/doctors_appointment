var appointments = require('./../server/controllers/server_controller.js');

module.exports = function(app) {
	app.get('/appointments', function(req, res){
		appointments.show(req, res);
	});
	app.post('/addappointment', function(req, res){
		console.log('122342', req.body);
		appointments.newappointment(req, res);
	})
	app.delete('/appointments/:id', function(req, res){
		appointments.delete(req, res);
	});
}