//Este JSON es para obtener información de una api con url local
function getJSON(url) {

	//Se Retornará una promesa mediante new Promise por ser el protocolo para devolver promesas (los parametros corresponden a los estados de promesa que son resolver y rechazar) 
	return new Promise(function(resolve, reject) {
	   
	        var ajax = new XMLHttpRequest();
	        ajax.open("GET", url);
	        ajax.send();

	        //El método onreadystatechange, detecta cambios en el estado. 
	        ajax.onreadystatechange = function() {
	             	//El readystate tiene parámetros del 0 al 4, 4 significa que el requerimiento fue cargado y ya se obtuvo una respuesta.
	                if (ajax.readyState == 4) {

	                	//El resolve es un parametro que valida que la promesa se cumplió. ResponseText obtiene la respuesta de la data como string, el parse lo convierte en objeto.
	                    resolve(JSON.parse(ajax.responseText));
	                };
	        };
	});
};

var plantilla = '<div class="card col m3 offset-m1 s8 offset-s2">'+
				    '<div class="card-image waves-effect waves-block waves-light">'+
				      '<img class="activator" src="static/img/**imagen**.jpg">'+
				   '</div>'+
				    '<div class="card-content">'+
				      '<span class="card-title activator grey-text text-darken-4">**Planeta**<i class="material-icons right">more_vert</i></span>'+
				    '</div>'+
				    '<div class="card-reveal">'+
				      '<h4 class="card-title grey-text text-darken-4">**PlanetaCard**<i class="material-icons right">close</i></h4>'+
				      '<h6>Date: **fecha**</h6>'+
				      '<h6>Mass: **masa**</h6>'+
				      '<h6>Radio: **radio**</h6>'+
				    '</div>'+
				'</div>';

//A la función getJSON se le otorga el parámetro de url
getJSON("data/earth-like-results.json")

//.then funciona cuando la promesa se cumplió y necesita un parámetro que devuelva mediante return una nueva promesa.
.then(function(response){
	var arregloPromesas = (response.results.map(function(url){
	 	return getJSON(url)
	}));

	return Promise.all(arregloPromesas);

}) //Proporciona el resultado del planeta en indice 0, esta función permite que se ejecute el segundo then.
	
.then(function(arrayPromises){
	var contenedor = document.getElementById('planet-cards');
	arrayPromises.forEach(function(element){
		var namePlanet = element.pl_name;
		console.log(element)
		var nuevaPlantilla = plantilla.replace('**Planeta**', namePlanet)
			.replace('**imagen**', namePlanet)
			.replace('**PlanetaCard**', namePlanet)
			.replace('**fecha**', element.pl_disc)
			.replace('**masa**', element.pl_masse)
			.replace('**radio**', element.st_rad)
		contenedor.innerHTML += nuevaPlantilla;
	});
	

});

