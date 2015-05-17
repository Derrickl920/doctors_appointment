var mongoose = require('mongoose');
var Appointment = mongoose.model('Appointment');

module.exports= (function(){
	return{
		show: function(req, res) {

			Appointment.find({}, function(err, results){
				if(err){
					console.log(err);
				}else{
					res.json(results);
				}
			})
		},
		newappointment: function(req, res){
			var errors = [];

			if(req.body.complain.length <10 ){
				errors.push({error: "Complain must be longer than 10 characters"});
			}
			var now = new Date();
			if(req.body.date < now.toISOString()){
				errors.push({ error: 'Must schedule time for future'});
			}

			var newDate = new Date(req.body.date);

			Appointment.find({date: newDate}, function(err, result){
				if(result.patient == req.body.patient
					&& result.created_at == newDate){
					console.log(result_created_at);
				}
				if(result.length >= 3 ){
					errors.push({ error: "day is fully booked"});
					console.log(errors);
					res.json(errors);
				}
				else{
					if(errors.length <= 0){
						var appointment = new Appointment(req.body);
						appointment.save(function(err,result){
							if(!err){
								console.log('success new appoint!', result);
								res.json(result);
							}
						});
					}else{
						res.json(errors);
					}
				}
			});
		},
		delete: function(req, res){
			Appointment.remove({_id: req.params.id}, function(err){
				if(!err){
					res.end();
				}
			});
		}
	}
})();

