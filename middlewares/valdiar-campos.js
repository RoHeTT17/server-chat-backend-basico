const{validationResult} = require('express-validator');

//next es un callback que le va a indicar a express que si solo sale bien 
//continue con el siquiente middleware. Sino tiene el next nunca continuaría.

const valdiarCampos = (req, res, next) => {

    const errores = validationResult(req);

    if( !errores.isEmpty()){
        //Si hay un mensaje de error, se manda un return para no siga ejecutando.  
         return res.status(400).json({
                 ok: false,
                 errors: errores.mapped() //Muestra los errores 
         });
     }
  
     next();

}

module.exports = {
    valdiarCampos
}