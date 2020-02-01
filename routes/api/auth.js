const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const {
   check,
   validationResult
} = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const db = config.get('jwtSecret');
// @route         Get api/auth
// @desc          Get the user authenticated
// @access        Public

router.get('/', auth, async (req, res) => {
   try {

      const user = await User.findById(req.user.id)
         .select('-password');

      res.status(200).json({
         user
      })
   } catch (err) {
      console.error(err.message);
      res.status(500).send('Error de servidor');
   }
});
// @route         POST api/user
// @desc          LOgin Usuario
// @access        Public
router.post('/', [
   // valida rutas
   check('email', 'Please include a valid email').isEmail(),
   check('password', 'Password is required').exists()
], async (req, res) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({
         errors: errors.array()
      });
   }
   const {
      email,
      password
   } = req.body;
  
   try {
      // Mirar si el usuario ya existe
      let user = await User.findOne({
         email
      });
      if (!user) {
         return res.status(400).json({
            errors: [{
               msg: 'Credenciales Invalidas'
            }]
         })
      }

      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
         return res.status(400).json({
            msg: 'Credenciales invalidas'
         })
      }
      const payload = {
         user: {
            id: user.id,
            name: user.name

         }
      }
      const jwtoptions = {
         expiresIn: 360000
      }
      jwt.sign(payload, db, jwtoptions,
         (err, token) => {
            if (err) throw err;
            return res.status(200).json({
               token
            })
         });

      // Retornar el json token
   } catch (err) {
      console.error(err.message);
      res.status(500).send('error de servidor');
   }
});



module.exports = router;