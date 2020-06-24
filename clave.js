const config = require('config');
module.exports = JWT_SECRET = process.env.jwtSecret || config.get('jwtSecret');
