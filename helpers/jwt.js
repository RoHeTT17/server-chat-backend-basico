const jwt = require('jsonwebtoken');

const generarJWT = (uid) =>{

    return new Promise ( (resolve, reject) =>{

        const payload ={
            uid 
        };
    
        //El segundo argumento es una palabra que es la llave para encriptar,
        //Es muy importante ocultar esta palabra para que no se haga mal uso de ella
        //Yo creo que se debería obtener de la base de datos.
        //El tercer argumento, es un objeto que van características del Token
        //Cuarto argumento es un Callback  que dispara en error (err) si ocurre un problema
        // o un token si todo sale bien.
        jwt.sign(payload, process.env.JWT_KEY,{
               expiresIn: '12h', 
        }, 
         //Callback   
         (err, token) =>{
    
            if( err){
                //no se pudo crear el token
                reject('No se pudo generar el JWT');

            }else{
                resolve(token);    
            }
    
        });

    });

}

module.exports = {
    generarJWT
}