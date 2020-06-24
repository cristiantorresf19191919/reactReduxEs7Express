const passport = require("passport");
const jwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const User = require("./models/User");
const JWT_SECRET = require("./clave");
const LocalStrategy = require("passport-local");
//  incia sesion con google :)
const googlePLusTokenStrategy = require("passport-google-plus-token");
// inicia sesion con facebook
const FacebookTokenStrategy = require("passport-facebook-token");

// ojo la llave con la que firma es la misma que la llave con que valida
const optsJson = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
};

// JSON WEB TOKEN STRATEGY
passport.use(
  new jwtStrategy(optsJson, async (payload, done) => {
    try {
      // Find the user specified in token
      const user = await User.findById(payload.sub);
      // if user doesnt exist handle it
      if (!user) {
        return done(null, false);
      }
      if (user.rol == "user") {
        const usuario = { rol: false };
        return done(null, usuario);
      }
      console.log(payload);
      // Otherwise returned the user
      return done(null, user);
    } catch (error) {
      done(error, false);
    }
  })
);

// LOCAL STRATEGY logueo

const optsLocal = {
  usernameField: "email",
};
passport.use(
  new LocalStrategy(optsLocal, async (email, password, done) => {
    try {
      // find the user given the username
      const user = await User.findOne({ 'local.email':email });
      // if not, handle it
      if (!user) {
        return done(null, false,{msg:'no se encuentra usuario'});
      }
      // check if the password is correcteste metodo esta dentro del schema
      const match = await user.isValidPassword(password);
      // if not handle it
      if (!match) {
        return done(null, false,{msg:"credenciales invalidos"});
      }
      // pasar el usuario que viene de la base de datos
      return done(null, user);
    } catch (error) {
      return done(null, false);
    }

    // otherwise return the user
  })
);

// Google oauth2 Strategy
passport.use(
  new googlePLusTokenStrategy(
    {
      clientID:
        "791692439769-m8uaqm9h70fmoot0c1nlmdmann21cmr5.apps.googleusercontent.com",
      clientSecret: "deXxIDcIyOhFu3yGv3AFsYbO",
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, next) => {      
      try {
        // estos datos me lo envia google
      console.log("accessToken -> ", accessToken);
      console.log("refreshToken -> ", refreshToken);
      console.log("profile -> ", profile);
        //check whether this current user exists in our DB
        const existingUser = await User.findOne({ "google.id": profile.id });
        if (existingUser) {
          // si ya existe el usuario devuelve el token
          // manda el usuario desde la base de datos a la ruta
          // y luego el controlador genera el token
          console.log('el usuario ya se encuentra registrado');
          return next(null, existingUser);
        }
        // if is new account
        const newUser = new User({
          method: "google",
          username: profile.emails[0].value,
          name: profile.name.givenName,
          rol:'user',
          google: {
            id: profile.id,
            email: profile.emails[0].value,
            photo: profile.photos[0].value,
          },
        });
        await newUser.save();
        next(null, newUser);
      } catch (error) {
        next(error,false,error.message);
      }     
    }
  )
);

// autenticar con facebook
passport.use('facebookToken', new FacebookTokenStrategy(
  {
    clientID: "680896892490071",
    clientSecret: "0b0204dba4389971b4cc67dccfabec50"
  }, async (accessToken, refreshToken, profile, next)=>{
    try {
      console.log('profile ',profile);
      console.log('accessToken ',accessToken);
      console.log('refreshToken ',refreshToken);
     const existingUser = await User.findOne({"facebook.id":profile.id});

     if (existingUser){
       console.log(' el usuario ya se encuentra registrado');
       return next(null,existingUser);
     }

     const newUser = new User({
       method:'facebook',
       facebook:{
         id:profile.id,
         email:profile.emails[0].value,
         photo:profile.photos[0].value
       },
       username:profile.emails[0].value,
       name:profile.displayName,
       rol:'user'
     })
      await newUser.save();
      next(null, newUser);


    } catch (error) {
      console.log(error);
    }
  }
))