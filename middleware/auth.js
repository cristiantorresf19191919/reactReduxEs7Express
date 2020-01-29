const jwt = require('jsonwebtoken');
const config = require('config');


module.exports = function (req, res, next) {
   // Get token
   const token = req.header('Authorization');

   // Check if not token
   if (!token) {
      return res.status(401).json({
         msg: 'No Token, Autorizacion denegada'
      })
   };

   // Verificar Token
   try {
      const clave = config.get('jwtSecret');
      const decoded = jwt.verify(token, clave);
      req.user = decoded.user;
      next();
   } catch (err) {
      res.status(401).json({
         msg: 'Token is not valid'
      });
   }
   
}


