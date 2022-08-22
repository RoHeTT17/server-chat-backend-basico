const{response} = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require ('bcryptjs'); //para encriptar
const { generarJWT } = require('../helpers/jwt');
//const{validationResult} = require('express-validator');

const login = async (req, res = response ) =>{


     try {

       

      return  res.json({
            ok: true,
            msg : 'Login!!!',

   });
        

     } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
     }

}

module.exports = {
    login
};