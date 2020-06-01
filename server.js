const express = require('express');
const app = express();
const connectDB = require('./config/db');
const bodyparser = require('body-parser');
const cors = require('cors');
// conectar base de datos 
connectDB();
// middleware bodyparser
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(cors());
app.use(bodyparser.json());
const PORT = process.env.PORT || 5000;
// serve static assets in production

// repasando middlewares es6
const LoggerMiddleware = (req,res,next) =>{
    console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
    console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
    console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
    console.log(`tengo una conexion a mi servidor entrante req.url =  ${req.url} req.method =  ${req.method} -- Date is = ${new Date()}`)
    console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
    console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
    console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
    next();
}
// corriendo la funcion
app.use(LoggerMiddleware);
// Definir Rutas
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/post', require('./routes/api/post'));
// Colecciones de cleiser
app.use('/api/usuariosCleiser', require('./routes/api/usuariosCleiser'));
app.use('/api/productos', require('./routes/api/productos'));
app.listen(PORT, () => console.log(`servidor empezo en el puerto ${PORT}`));