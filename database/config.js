//Cadena de conexión a la base de datos

//Importar mongoose
const mongoose = require('mongoose');

//Conexión a la base de datos
const dbConnection = async()=>{

    try {

        await mongoose.connect(process.env.DB_CONEX)/*,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })*/

        console.log('DB Online...');
    } catch (error) {
        console.log(error);
        throw new Error('Error en la base de datos.');

    }

}

//Exportar la función
module.exports ={
    dbConnection
}