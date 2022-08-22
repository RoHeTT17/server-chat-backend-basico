
//importar el io del index.js. 
//Es un importanción con nombre por eso va entre {}
const {io} = require('../index');

//Mensajes de Sockets

//El client es un dispositivo que se acaba de conectar al socket server
io.on('connection', client => {
    //Cuando la pagina web (index.html en este caso), se carga, crea una
    //conexión al socket server y esa conexión del navegador web, cae (guarda)
    //en este client
    console.log('Cliente conectado');

    //Este es el callbak que se va a disparar cuando este cliente 
    //en particular se desconecte
    client.on('disconnect', () => { 
        console.log('Cliente desconectado');
     });


  });