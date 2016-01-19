angular.module('ClimaAngular',['ngRoute'])
	.config(function($routeProvider){
		$routeProvider.when('/card',{
			templateUrl: 'card.html',
			controller: 'climaController'
		});
	});