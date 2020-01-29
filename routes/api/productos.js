const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const auth = require('../../middleware/auth');
require('../../models/productos');
const Producto = mongoose.model('Productos');
const {
    check,
    validationResult
} = require('express-validator/check');
// @route         get api/Producto/me
// @desc          Get current users Producto
// @access        Private

router.get('/', async(req, res) => {

    try {
        const Productos = await Producto.find().populate('usuariosQueTienenElProducto', ['nombre', 'cedula']);
        if (Productos) res.json(Productos);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('error en el servidor');
    }
});
router.get('/me', auth, async(req, res) => {
    try {
        const producto = await Producto.findOne({
            user: req.user.id
        }).populate('usuariosQueTienenElProducto', ['nombre', 'email']);
        if (!producto) return res.status(400).json({
            msg: 'No hay ningun producto para este usuario'
        });
        // aqui con el solo echo de hacer un query al producto puede acceder
        // a los datos del usuario
        return res.status(200).json({
            producto
        })
    } catch (err) {
        console.error(err.message);
        res.status(500).send('error en el servidor');
    }
});

// @route         post api/productos
// @desc          Publicar Productos 
// @acceso        Privado solo con token y autenticacion pueden subir                          productos


router.post('/', [
    check('caracteristicas', 'Status is required').not().isEmpty(),
    check('precio', 'Skills are required').not().isEmpty(),

], auth, async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    // destructive assignment
    const {
        nombre,
        categoria,
        caracteristicas,
        precio,
        referidoId
    } = req.body;
    // build Producto object     
    const campoProducto = {};
    
    campoProducto.usuariosQueTienenElProducto = req.user.id;
    if (referidoId) campoProducto.referidoId = referidoId;
    if (precio) campoProducto.precio = precio;
    if (categoria) campoProducto.categoria = categoria;
    if (nombre) campoProducto.nombre = nombre;
    // caracteristicas las convierte en un arreglo 
    // y guarda en campoProducto.
    if (caracteristicas) {
        campoProducto.caracteristicas = caracteristicas.split(',').map(
            (caracteristicas) => {
                return caracteristicas.trim()
            }
        );
    }
    // empieza programacion asyncrona
    try {
        let producto = await Producto.findOne({
            usuariosQueTienenElProducto: req.user.id
        });
        // encontro el producto actualizelo
        if (producto) {
            console.log('producto encontrado');
            producto = await Producto.findOneAndUpdate({
                usuariosQueTienenElProducto: req.user.id
            }, {
                // importante actualiza todo el objeto que se envie
                $set: campoProducto
            }, {
                new: true
            }).populate('usuariosQueTienenElProducto', ['nombre', 'cedula']);
            return res.status(200).json(producto);
        }
        // si no lo hay entonces cree el producto
        if (!producto) console.log('producto no encontrado voy a crear y a salvar');

        producto = new Producto(campoProducto)
        await producto.save();
        // envie el producto a json
        res.json(producto);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('error en el servidor');
    }
});
module.exports = router;