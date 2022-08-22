/*
    path: login/
*/ 

//El Router es quien indica como crear las rutas
const {Router } = require('express');
const { check } = require('express-validator');

const { login } = require('../controllers/login');
const { valdiarCampos } = require('../middlewares/valdiar-campos');

const router = Router();
/*
  Configurar ruta
  Primer parámetro nombre de la ruta
  Segundo parámetro es un callback, recibe el request (solicitud) y el response (respeusta)
*/

//Antes de ejecutar el Controllador (login), se pueden poner middlewares, así
//el segundo parámetro serían los middlewares

//check es un middleware que ya esta incluido en express y nos permite verificar campo por campo

router.post('/',[
          check('email','El correos obligatorio').isEmail(), 
          check('password','El password obligatorio').notEmpty(), //valdiarCampos,
          valdiarCampos
          ],
          login);

module.exports = router;