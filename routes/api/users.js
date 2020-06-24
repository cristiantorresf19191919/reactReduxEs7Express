const express = require("express");
const { check, validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
require("../../models/User");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const gravatar = require("gravatar");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("config");
const { signUp } = require("../../controllers/users");
const db = process.env.jwtSecret;

const passport = require('passport');

const checkTokenJwt = passport.authenticate("jwt",{session:false});


//ver todos los usuarios

router.get("/", async (req, res) => {
  const allUsers = await User.find();
  res.status(200).json(allUsers);
});

// change password for testing
router.get("/change", async (req, res) => {
  const { email } = req.query;
  const passworddq = "overcome19";
  try {
    const yo = await User.findOne({ email: email });
    // Encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    yo.password = await bcrypt.hash(passworddq, salt);

    await yo.save();
    res.status(200).send(`contrasena de ${yo.name} cambiada con exito`);

    res.status(200).json(yo);
  } catch (error) {
    res.status(500).send("error de servidor");
  }
});

// @route         POST api/user
// @desc          Registrar Usuario
// @access        Public
router.post(
  "/",
  [
    // valida rutas
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password must have 6 or more characters").isLength({
      min: 6,
    }),
  ],
  signUp
);

module.exports = router;
