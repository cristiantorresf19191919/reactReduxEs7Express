require("../models/User");
const JWT = require("jsonwebtoken");
 require("../models/User");
const JWT_SECRET = require("../clave");
const { generarToken } = require("../utilidades");
const { validationResult } = require("express-validator/check");
const gravatar = require("gravatar");
// funcion para generar el token con el payload
// ojo porque para autorizar las rutas validas la estrategia jwt esta usando el payload.sub
// pilas

signToken = (user) => {
  const payload = {
    iss: "CristianTorres",
    sub: user._id,
    iat: new Date().getTime(), // current time
    exp: new Date().setDate(new Date().getDate() + 1), // current time + 1 day ahead
  };
  return JWT.sign(payload, JWT_SECRET);
};

const signUp = async (req, res) => {
  try {
    // validation email password
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const { name, email, password } = req.body;
    let rol="user";
    //check if there is a user with the same email   
   
    const user = await User.findOne({ "local.email": email });
   
    if (user) {
      return res.status(400).json({
        errors: [
          {
            msg: "Usuario ya existe",
          },
        ],
      });
    }
    // Obtener avatar del usuario
    let avatarOptions = {
      s: "200",
      r: "pg",
      d: "mm",
    };
    const avatar = gravatar.url(email, avatarOptions);
  
    let newUser = new User({
        name,
        method:"local",
        local: {
          email: email,
          password: password,
        },
        rol,
        avatar,
      });

    // en el pre save en mongoose se va a encriptar la contraseña
    await newUser.save();
    const token = signToken(newUser);
    return res
      .status(202)
      .json({token});
    //
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "error en el servidor", error });
  }
};

const showAll = async (req, res) => {
  try {
    const allUsers = await User.find();
    if (allUsers) {
      return res.status(200).json(allUsers);
    }
    return res.status(400).send("rompio");
  } catch (error) {
    return res.status(500).json(error);
  }
};

const deleteAll = async (req, res) => {
  try {
    const allUsers = await User.deleteMany();
    if (allUsers) {
      return res.status(200).json(allUsers);
    }
    return res.status(400).send("rompio");
  } catch (error) {
    return res.status(500).json(error);
  }
};

const secret = async (req, res, next) => {
  console.log("I managed to get here");
  return res.status(200).json(req.user);
};

const signIn = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
       return res.status(400).json({
          errors: errors.array()
       });
    }
    try {
       console.log('pasando todos los middlewares imprimiendo usuario');
       console.log(req.user);
       // Mirar si el usuario ya existe      
       let token = generarToken(req.user);
       // Retornar el json token
       res.status(200).json({token});
    } catch (err) {
       console.error(err.message);
       res.status(500).send('error de servidor');
    }
};

const googleOauth = async (req, res) => {
  try {
    //generate token
    const token = signToken(req.user);
    console.log("req user");
    console.log(req.user);
    res.status(200).json({ token });
  } catch (error) {}
};
const facebookOauth = async (req, res) => {
  try {
    const texto = "auth con facebook EXITOSAMENTE";
    console.log(texto);
    const token = signToken(req.user);
    res.status(200).json({ msg: texto, usuario: req.user, token });
  } catch (error) {}
};

module.exports = {
  signUp,
  signIn,
  secret,
  showAll,
  deleteAll,
  googleOauth,
  facebookOauth,
};
