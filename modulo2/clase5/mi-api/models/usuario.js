const {Schema, model} = require('mongoose');

//Usuario: nombre, correo, edad
const usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        minlength: 2,
    },
    correo: {
        type: String,
        required: true,
        unique: true,
    },
    edad: {
        type: Number,
        min: 18,
        max: 100
    }
});

module.exports = model('usuario', usuarioSchema); //señor Mongodb, reconozca este esquema en su base de datos