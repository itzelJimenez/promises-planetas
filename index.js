//Express es un servidor de Javascript, 
var express=require('express');

//Inicializa express como función
var app = express();


//Genera una liga estática de los archivos que se indiquen para que el servidor los pueda reconocer..
app.use('/data', express.static(__dirname+'/data'));
app.use('/static', express.static(__dirname+'/assets'));


//Get es un método http que obtiene de la raíz del documento una respuesta y un requerimiento. 

app.get('/', function(req, res){
	//Le envía el index al servidor 
		res.sendFile(__dirname + '/index.html');
});

//Listen permite escuchar el servidor en el puerto declarado
 app.listen(8080);