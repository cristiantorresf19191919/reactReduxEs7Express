const mongoose = require('mongoose');
const { encriptarPassword, compararPassword } = require('../utilidades');
const UserSchema = new mongoose.Schema({
   name: {
      type: String  
   },
   method:{
      type:String,
      enum:['local','google','facebook']
   },
   local:{
      email:{
         type:String,
         lowercase:true

      },
      password:{
         type:String
      }
   },
   google:{
      id:{
         type:String
      },
      email:{
         type:String,
         lowercase:true
      },
      photo:{
         type:String
      }
   },
   facebook:{
      id:{
         type:String
      },
      email:{
         type:String,
         lowercase:true
      },
      photo:{
         type:String
      }
   },   
   passInsegura:{
      type: String,
      required: false
   },  
   avatar: {
      type: String
   },
   rol:{
      type:String
   },
   date: {
      type: Date,
      default: Date.now
   }
});

// salvar password antes de guardar en la base de datos
UserSchema.pre('save', async function(next){
   try {
      // si uso google o facebook para autenticarme

      if (this.method !== 'local'){
       
         next();          
      }
      const hashed = await encriptarPassword(this.local.password);
      this.local.password = hashed;
     
      if (this.local.password ===  hashed){

         next();      
      }
   } catch (error) {
      next(error);
   }
})

UserSchema.methods.isValidPassword = async function(newPassword){
   try {
      return await compararPassword(newPassword, this.local.password);
   } catch (error) {
      // no acces to next function for that reason we have to use throw New Error
      throw new Error(error);
      
   }

}



module.exports = User = mongoose.model('User', UserSchema);