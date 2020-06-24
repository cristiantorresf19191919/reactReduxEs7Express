const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
const JWT_SECRET = require("./clave");
const config = require('config');

const encriptarPassword = async (clave, saltos = 10) => {
  let salto = await bcrypt.genSalt(saltos);
  let password = await bcrypt.hash(clave, salto);
  return password;
};

const compararPassword = async (claveViene, claveNd) =>{
    try {
      return await bcrypt.compare(claveViene,claveNd);
      
    } catch (error) {
      throw new Error(error);
    }
}
// firmar token
const generarToken = (usuario) => {
  if (usuario) {
    const payload = {
      iss: "CristianTorres",
      sub: usuario._id,
      rol: usuario.rol,
      iat: new Date().getTime(), // current time
      exp: new Date().setDate(new Date().getDate() + 1), // current time + 1 day ahead
    };  
    const llavePrivada = process.env.LLAVEPRIVADA || JWT_SECRET;
    const token = jsonwebtoken.sign(
      payload,
      llavePrivada      
    );
    if (token) return token;
  }
};

module.exports = {
  encriptarPassword,
  generarToken,
  compararPassword
};
