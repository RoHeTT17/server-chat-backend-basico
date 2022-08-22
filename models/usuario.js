/*
  Scheme : ayuda para crear el modelo (como luce el modelo)
  model  : lo que se vera hacia "afuera"
 */

const{Schema, model} = require('mongoose');

const UsuarioSchema = Schema({

    nombre: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    online: {
        type: Boolean,
        default: false
    },
});

//Sobre escribir un método
//Se usa una función tradicional porque la de flecha no modifican el
//valor al que apunta el this (Es mas de javascript)
UsuarioSchema.method('toJSON', function(){
    //el this.toObject es la instancia del objecto que esta creado
    //entre las {} estan los campos que estamos extrayendo
    //con el ... se esta diciendo que el resto de las propiedades serán almecenadas
    //en algo llama object
    const{ __v, _id, password, ...object} = this.toObject();

    //Agregar una nueva propeida (es para darle el nombre que queremos)
    object.uid = _id;

    return object;
});

//Exportar el modelo
module.exports = model('Usuario', UsuarioSchema);