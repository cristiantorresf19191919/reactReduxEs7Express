const mongoose = require('mongoose');

const UsuarioCleiserSchema = new mongoose.Schema({

    productosDeUsuario: {
        type: mongoose.Schema.Types.ObjectId,
        // referencia el modelo de productos
        ref: 'Productos'
    },
    nombre: {
        type: String,
        required: true
    },
    cedula: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('UsuariosCleiser', UsuarioCleiserSchema);