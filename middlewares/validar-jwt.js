const jwt = require('jsonwebtoken'); 

const valdiarJWT = ( req, res, next) => {

  //Leer el Token
  const token = req.header('x-token');

  //console.log(token);

  if( !token ){
    return res.status(401).json({
        ok: false,
        msg: 'No hay token en la petición'
    });
  }  

   try {

      //extrar el uid
      //Para esta parte, hay que entender como esta conformado un JWT, consta de 3
      //partes, es una parte del token, podemos extraer la información que esta almacenada,
      //en este caso el uid.
      //Lo que hace la funcion es que recibe el token que mandamos en el header y también la
      //palabra con la que se firmo el token, si es validado obtenemos el uid
      const {uid} = jwt.verify(token , process.env.JWT_KEY);
      
      if (!uid){
            return res.status(401).json({
                ok: false,
                msg: "Token undifined",
            });
      }

      req.uid = uid;

      next();

   } catch (error) {
    res.status(401).json({
        ok: false,
        msg: 'Token no válido'
    })
   }
}

module.exports = {
    valdiarJWT
}