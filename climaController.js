climaAngular.controller('climaController',['$scope','$http',ClimaController])

function ClimaController ($scope,$http){
	$scope.cities = [];
	$scope.pushCities = function(){	
		for(var item in localStorage){
			$scope.cities.push(JSON.parse(localStorage.getItem(item)));
		};
	}
	$scope.pushCities();
	$scope.addCity = function(){
		$scope.url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22"+$scope.formCityText+"%2C%20"+$scope.formProvincetext+"%22)%20and%20u=%22c%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
		$http({
			method :'GET',
			url: $scope.url
		}).then(function(data){
			/*our key to the localStorage that is univocal*/
			var key = data.data.query.results.channel.description;
			if(data != localStorage.getItem(key)){
				var cityTemp = data;
				var windDirection = cityTemp.data.query.results.channel.wind.direction;	
				var actualDirection;	
				/*this is to say the correct direction of the wind*/
				if(windDirection >= "0" && windDirection < "45"){
					actualDirection = "north";
				} 
				if(windDirection >= "45" && windDirection < "90"){
					actualDirection = "northeastern";
				} 
				if(windDirection >= "90" && windDirection < "135"){
					actualDirection = "east";
				} 
				if(windDirection >= "135" && windDirection < "180"){
					actualDirection = "southeast";
				} 
				if(windDirection >= "180" && windDirection < "225"){
					actualDirection = "south";
				} 
				if(windDirection >= "225" && windDirection < "270"){
					actualDirection = "southwest";
				} 
				if(windDirection >= "270" && windDirection < "315"){
					actualDirection = "west";
				}
				if(windDirection >= "315" && windDirection <= "360"){
					actualDirection = "northwest";                   
				}
				/*modifies the data, to they can have the url image and a more elegant direction of the wind*/
				cityTemp.data.query.results.channel.wind.direction = actualDirection;
				cityTemp.data.query.results.channel.item.description = "http://l.yimg.com/a/i/us/we/52/"+cityTemp.data.query.results.channel.item.condition.code+".gif";
				localStorage.setItem(key,JSON.stringify(cityTemp));/*modificar*/
				$scope.pushCities();
				
				
			//$("#cityPlace").append("<div class='col l6 m6 s12'> <div class='card'> <div class='card-content'> <h5>"+cityTemp.data.query.results.channel.location.city+" , "+cityTemp.data.query.results.channel.location.country+"<i class='right tiny material-icons' click='closeCity(key)'>settings_power</i></h5> <p>"+cityTemp.data.query.results.channel.item.condition.date+"</p> <p>"+cityTemp.data.query.results.channel.item.condition.text+"</p> <div class='row valign-wrapper'> <div class='col l2 m2 s3'> <img src='"+cityTemp.data.query.results.channel.item.description+"'> </div> <div class='col l3 m3 s3'> <h1 class='valign'>"+cityTemp.data.query.results.channel.item.condition.temp+"<sup><font size='6'>°"+cityTemp.data.query.results.channel.units.temperature+"</font></sup></h1> </div> <div class='col l7 m7 s6'> <div class='valign'> <p>Pressure: "+cityTemp.data.query.results.channel.atmosphere.pressure+""+cityTemp.data.query.results.channel.units.pressure+"</p> <p>Humidity: "+cityTemp.data.query.results.channel.atmosphere.humidity+"%</p> <p>Wind: "+cityTemp.data.query.results.channel.wind.speed+""+cityTemp.data.query.results.channel.units.speed+" "+cityTemp.data.query.results.channel.wind.direction+"</p> </div> </div> </div> </div> </div> </div>"); 
			}
			$scope.formCityText = '';
			$scope.formProvincetext = '';
		}, function(data){
			window.alert("City unavailable");
		});
	};

	$scope.removeCity = function(key){
		localStorage.removeItem(key);
		/*y con esta sentencia de arriba remuevo el item, directamente accediendo con la clave,*/ 
		/*refresh to show the items not removed*/
		window.location.reload(true);/*modificar*/
	};
}
