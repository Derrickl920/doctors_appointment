
var doc_app = angular.module('myApp', ['ngRoute']);

	doc_app.config(function ($routeProvider){
		$routeProvider
		.when('/', {
			templateUrl:'./partials/home.html'
		})
		.when('/new_appointment',{
			templateUrl: './partials/new_appointment.html'
		})
		.when('#/home',{
			templateUrl: './partrials/home.html'
		})
		.otherwise({
			redirectTo: '/'
		})
	})

//-----------CONTROLLER--------------//
doc_app.controller('docsController', function ($scope, docsFactory){
	$scope.appointments = [];

	$scope.user= prompt('Enter your name');
	docsFactory.user = $scope.user;
	console.log(docsFactory.user);


	docsFactory.getAppointments(function(data){

		for(var i in data){
			if(data[i].patient == $scope.user){
				data[i].isYou = true;
			}
			else{
				data[i].isYou = false;
			}
		}
		$scope.appointments = data;
	})
	$scope.deleteAppointment = function(selectedAppointment){
		docsFactory.deleteAppointment(selectedAppointment);
	}
})


doc_app.controller('appointmentController', function ($scope, $location, docsFactory){
	$scope.errors = [];
	$scope.isError = false;

		$scope.addAppointment = function(data){
			$scope.isError = false;
			$scope.errors = [];

			docsFactory.addAppointment(data, function(err, result){
				if(err != null){
					$scope.isError = true;
					$scope.errors = err;
					console.log(err);
				}
				else{
					console.log('success');
					$scope.isError = false;
					$scope.errors = [];
					$location.path('/').replace();
				}
			})
	}
})

//-----------FACTORY--------------//
doc_app.factory('docsFactory', function($http) {
	var factory = {};
	var appointments = [];
	factory.user = '';

	factory.getAppointments = function(callback) {
		$http.get('/appointments').success(function(output){
			appointments = output;
			callback(appointments);
		})
	}
	factory.addAppointment = function(info, callback){
		info.patient = factory.user;
		appointments.push({ date: info.date, time: info.time, patient: info.patient, complain: info.complain});
		$http.post('addappointment', info).success(function(result){
			console.log(result);
			if(angular.isArray(result)) {
				console.log("err:", result);
				callback(result, null);
			}
			else {
				console.dir("success:", result);
				appointments.push(result);
				callback(null, result);
			}
		});
	};

	factory.deleteAppointment = function(selectedAppointment, callback){
		$http({
			method: "DELETE",
			url: "/appointments/" + selectedAppointment._id
		}).success(function(result){
			appointments.splice(appointments.indexOf(selectedAppointment),1);
		});
	};
	return factory


});

