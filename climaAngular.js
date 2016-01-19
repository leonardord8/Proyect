var climaAngular = angular.module('ClimaAngular',['ngRoute'])
	.config(function($routeProvider){
		$routeProvider.when('/',{
			templateUrl: './card.html',
			controller: 'climaController'
		});
	});