/*
    path: /api/login
*/ 

//El Router es quien indica como crear las rutas
const {Router, response} = require('express');
const { check } = require('express-validator');

const { crearUsuario,login,renewToken } = require('../controllers/auth');
//const { login } = require('../controllers/login');

const { valdiarCampos } = require('../middlewares/valdiar-campos');
const { valdiarJWT } = require('../middlewares/validar-jwt');

const router = Router();
/*
  Configurar ruta
  Primer parámetro nombre de la ruta
  Segundo parámetro es un callback, recibe el request (solicitud) y el response (respeusta)
*/

/*
//Se puede hacer de esta manera, pero, se recomienda que el controlador este en
//otra ruta (carpeta controllers), para tener un mejor control del código
router.post('/new',(req, res = response)=>{

   res.json({
        ok: true,
        msg : 'Crear Usuario'
   });
    
});
*/


//Antes de ejecutar el Controllador (crearUsuario), se pueden poner middlewares, así
//el segundo parámetro serían los middlewares

//check es un middleware que ya esta incluido en express y nos permite verificar campo por campo
router.post('/new',[
                    check('nombre','El nombre es obligatorio').notEmpty(), //valdiarCampos,
                    check('password','El password obligatorio').notEmpty(), //valdiarCampos,
                    check('email','El correos obligatorio').isEmail(), 
                    valdiarCampos
                   ],
            crearUsuario);

//Tambén se hizo la prueba con un archivo solo para esta ruta, de las dos formas funciona.            
router.post('/',[
  check('email','El correos obligatorio').isEmail(), 
  check('password','El password obligatorio').notEmpty(), //valdiarCampos,
  valdiarCampos
  ],
  login);


//Valdiar token          
router.get('/renew', valdiarJWT ,renewToken);




module.exports = router;