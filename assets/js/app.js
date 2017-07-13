//Este JSON es para obtener información de una api con url local
function getJSON(url) {

	//Se Retornará una promesa mediante new Promise por ser el protocolo para devolver promesas (los parametros corresponden a los estados de promesa que son resolver y rechazar) 
	return new Promise(function(resolve, reject) {
	            	
	      	//XMLHttpRequest se declara cuando se quiere obtener data del servidor web
	      	//Ajax es una instancia del objeto XMLHttpRequest
	        var ajax = new XMLHttpRequest();
	        //El método open() sustituye el getJSON,
	        //es un método de Ajax para especificar el tipo de petición que quieres hacer al servidor, 
	        //en este caso es el get, despues se envía con el método .send() un request al servidor.
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

var plantilla = '<div class="card col m3 offset-m1">'+
				    '<div class="card-image waves-effect waves-block waves-light">'+
				      '<img class="activator" src="static/img/**imagen**.jpg">'+
				   '</div>'+
				    '<div class="card-content">'+
				      '<span class="card-title activator grey-text text-darken-4">**Planeta**<i class="material-icons right">more_vert</i></span>'+
				      '<p><a href="#">This is a link</a></p>'+
				    '</div>'+
				    '<div class="card-reveal">'+
				      '<h4 class="card-title grey-text text-darken-4">**PlanetaCard**<i class="material-icons right">close</i></h4>'+
				      '<h6>Peso: </h6>'+
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
		console.log(namePlanet)
		var nuevaPlantilla = plantilla.replace('**Planeta**', namePlanet)
			.replace('**imagen**', namePlanet)
			.replace('**PlanetaCard**', namePlanet);
		contenedor.innerHTML += nuevaPlantilla;
	});
	

});

function imprimirDatos(){

}
