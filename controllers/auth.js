const{response} = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require ('bcryptjs'); //para encriptar
const { generarJWT } = require('../helpers/jwt');
//const{validationResult} = require('express-validator');

const crearUsuario = async (req, res = response ) =>{

    /*
    // Se movio este código a middlewares/valdiar-campos.js
    const errores = validationResult (req);

    if( !errores.isEmpty()){
        //Si hay un mensaje de error, se manda un return para no siga ejecutando.  
         return res.status(400).json({
                 ok: false,
                 errors: errores.mapped() //Muestra los errores 
         });
     }*/
 

     //Valdiar si el correo ya existe

     const {email,password} = req.body;
     //Tambén serviría:
     //const {nombre, email, password} = req.body; o const email = req.body.email; 

     try {

        //Hacer una consulta
        const existeEmail = await Usuario.findOne({email});
        //También se puede mandar así
        //const existeEmail = await Usuario.findOne({email: email});

        if(existeEmail){
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            });
        }

        //Crear una instancia del modelo usuario. (Al recibir req.body filtra de forma 
        //automatica las propiedades del modelo)
        const usuario = new Usuario (req.body);

        //Encriptar contraseña
        //1. Generar un salt. Este salt es usado el criptologia para genrar un número o
        //número aleatorios, para que incluso si hay contraseñas "iguales", siempre generen un
        //salt diferente
        const salt = bcrypt.genSaltSync();

        //2. Ahora si, encriptar
        usuario.password = bcrypt.hashSync(password, salt);

        //Ahora podemos usar el método save, para guarde en la base de datos (ya la 
        //instanciamos en el index.js).
        //El método save es un Promise, por lo que podemos hacer uso de async y await
        await usuario.save();

        //Generar Jason Web Token (JWT)
        const token = await generarJWT(usuario.id);    


        res.json({
            ok: true,
            msg : 'Crear Usuario!!!',
            body: req.body,
            usuario,
            //retornar token
            token
   });

    
     } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
     }
}

const login = async (req, res = response ) =>{

    const{email, password} = req.body;

    try {
        
        const usuarioDB = await Usuario.findOne({email});

        //validar que exista el correo
        if ( !usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }


        //Validar password
        //Primer password es el que se esta recibiendo el peticion (res)
        //El segundo passwors es el que se obtiene de la base de datos.
        const valdiarPassword = bcrypt.compareSync(password, usuarioDB.password);

        if(!valdiarPassword){
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no es valdia'
            });
        }    

        //Generar JWT
        const token = await generarJWT (usuarioDB.id);

        res.json({
            ok: true,
            usuarioDB,
            //retornar token
            token
        });

    } catch (error) {
        
        console.log(error);

        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }    
}

const renewToken = async (req, res = response) =>{

    // const uid del usuario
    const uid = req.uid;

    /*console.log('valdiator jwt');
    console.log(uid)*/

    // generar un nuevo JWT, generarJWT... uid...
    const token = await generarJWT (uid);

    // Obtener el usuario por el UID, Usuario.findById
    const usuarioDB = await Usuario.findById(uid);

   // try {
    


        //validar que exista
       /* if ( !usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'Usario no valido'
            });
        }*/



    res.json({
        ok: true,
        //boyy: req.uid,
        usuarioDB,
        token
        //uid: uid
    });

    /*} catch (error) {

        console.log(error);

        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }*/
}

module.exports = {
    crearUsuario,
    login,
    renewToken
};