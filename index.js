//Express es paquete que permite conectar con el servidor, require es para obtener el paquete.
var express=require('express');
var path= require('path');
//Inicializa el paquete como función
var app = express();
//Conecta la liga estatica con express, le indica que directorio va a tomar
app.use('/data', express.static(__dirname+'/data'));
//Get obtiene de la riz del documento una respuesta y un requerimiento. Solo hemos usado response.
app.get('/', function(req, res){
	//Le envía el index al servidor 
		res.sendFile(__dirname + '/index.html');
})
//Listen permite escuchar el servidor en el puerto declarado
 app.listen(8080);