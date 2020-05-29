const mongoose = require('mongoose');

const productosSchema = new mongoose.Schema({
    usuariosQueTienenElProducto: {
        type: mongoose.Schema.Types.ObjectId,
        // en referencia pongo mi modelo de usuario
        ref: 'UsuariosCleiser'
    },
    precio: {
        type: String
    },
    caracteristicas: {
        type: [String]
    },
    referidoId: {
        type: String
    },
    nombre: {
        type: String
    },
    categoria: {
        type: String
    },
    //etc
});

module.exports = mongoose.model('Productos', productosSchema);