const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

userSchema.pre('save',function(next){
    const user = this;
    //VAlidar si la contraseña fue modificada
    if(!user.isModified('password')){
     return next();//no hacemos nada y continuamos
    }

    bcrypt.genSalt(10,(err,salt) => {
      if(err){
          return next(err);
      }

      bcrypt.hash(user.password,salt,(err,hash) => {
        if(err){
            return next(err);
        }

        user.password = hash;//sobreescribimos el password plano y lo remplazamos por uno codificado y con salt
        next();
      });
    });
});
//agregamos un metodo a nuestro schema de usuario
//usamos function en lugar de funcion flecha porque, porque la funcion flecha usa estos valores en el contexto donde luego es usada
//pero la funcion anonima lo usara en este contexto, de esste archivo
userSchema.methods.comparePassword = function(
    candidatePassword
    ){
   return new Promise((resolve,reject) => {
      //resolve===Resolver si esta todo ok  reject===Rechazar
      //usamos una promesa porque es una actividad asincrona comparar las contraseñas
      const user = this;
      bcrypt.compare(candidatePassword,user.password,(err,isMatch)=>{
          if(err){
              return reject(err);
          }
          //si no coinciden los password
          if(!isMatch){
              return reject(false);
          }
          //si coinciden
          resolve(true);
      });

   });
};

mongoose.model('User',userSchema);//asociamos la cadena User a la el userSchema