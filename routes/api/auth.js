const express = require('express');
const router = express.Router();
const passport = require('passport');
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
const { generarToken } = require('../../utilidades');
const { signIn } = require('../../controllers/users');
const db = process.env.jwtSecret || config.get('jwtSecret');
// @route         Get api/auth
// @desc          Get the user authenticated
// @access        Public



// LOCAL STRATEGY logueo

const optsLocal = {
   usernameField: "email",
 };

const passportLocal =  passport.authenticate("local", { session: false });

const passportJWT = passport.authenticate("jwt", { session: false });
router.get('/', passportJWT, async (req, res) => {
   try {
      res.status(200).json(req.user);
   } catch (err) {
      console.error(err.message);
      res.status(500).send('Error de servidor');
   }
});
// @route         POST api/user
// @desc          LOgin Usuario
// @access        Public
router.post('/',
passportLocal,
 [
   // valida rutas
   check('email', 'Please include a valid email').isEmail(),
   check('password', 'Password is required').exists()
], signIn);




module.exports = router;