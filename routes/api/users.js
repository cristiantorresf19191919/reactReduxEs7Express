const express = require('express');
const {
   check,
   validationResult
} = require('express-validator/check');
const bcrypt = require('bcryptjs');
require('../../models/User');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const gravatar = require('gravatar');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const db = config.get('jwtSecret');

//ver todos los usuarios

router.get('/', async (req,res) => {
   const allUsers = await User.find();
   res.status(200).json(allUsers);  
})


// change password for testing
router.get('/change', async (req,res)=>{
   const {email} = req.query;
   const passworddq = 'overcome19';
   try {
       const yo = await User.findOne({email:email});  
       // Encriptar la contraseña  
       const salt = await bcrypt.genSalt(10);
       yo.password = await bcrypt.hash(passworddq, salt);

       await yo.save();
      res.status(200).send(`contrasena de ${yo.name} cambiada con exito`);

    res.status(200).json(yo);
   } catch (error) {
      res.status(500).send('error de servidor');
      
   }
   
});


// @route         POST api/user
// @desc          Registrar Usuario
// @access        Public
router.post('/', [
   // valida rutas
   check('name', 'Name is required').not().isEmpty(),
   check('email', 'Please include a valid email').isEmail(),
   check('password', 'Password must have 6 or more characters').isLength({
      min: 6
   })
], async (req, res) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({
         errors: errors.array()
      });
   }
   const {
      name,
      email,
      password,
      whatsapp
   } = req.body;
   try {
      // Mirar si el usuario ya existe
      let user = await User.findOne({
         email: email
      });
      if (user) {
         return res.status(400).json({
            errors: [{
               msg: 'Usuario ya existe'
            }]
         })
      }
      // Obtener avatar del usuario
      let avatarOptions = {
         s: '200',
         r: 'pg',
         d: 'mm'
      }
      const avatar = gravatar.url(email, avatarOptions);
      // no hay necesidad de redeclarar declaracion destructiva {} 
      // ya no mas con el req.body
      const objetoGuardar = {
         name,
         email,
         avatar,
         password,
         whatsapp
      }
      
      user = new User(objetoGuardar);
      // Encriptar la contraseña
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      let userSaved = await user.save();
      if (userSaved) {
         const payload = {
            user: {
               id: userSaved.id,
               name: userSaved.name

            }
         }
         const jwtoptions = {
            expiresIn: 360000
         }
         jwt.sign(payload, db, jwtoptions,
            (err, token) => {
               if (err) throw err;
               return res.status(200).json(
                  {token}
               )
            });
      }
      // Retornar el json token
   } catch (err) {
      console.error(err.message);
      res.status(500).send('error de servidor');
   }
});




// @route         GET api/user/remove/:id
// @desc          Remove Usuario
// @access        Public

router.get('/remove/:id', async (req,res) => {
   try {
      let user = await User.remove({ _id : req.params.id});
      if (user) res.status(200).send('user deleted');
      
   } catch (error) {
      res.status(500).send(error);
   }
})

module.exports = router;