const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = (req,res,next) => {
    //obtendremos el encabezado
    const {authorization} = req.headers;//En postman autorization esta en mayuscula y aqui minuscala porque cuando se hace la peticion todo cambia a minuscula
    //validamos que exista un token
    //authorization === 'Bearer jsjdnsjndsjndjsndjnsjd'
    if(!authorization){
        return res.status(401).send({error:'Usted deberia haber iniciado sesion'});
    }
    //extraemos el valor del token
    const token = authorization.replace('Bearer ','');//sacamos el Bearer y el espacio q hay con el token
    jwt.verify(token,'MY_SECRET_KEY',async (err,payload) => {
        if(err){
            return res.status(401).send({error:'Usted deberia haber iniciado sesion'});  
        }
        console.log(payload);
        const {userId} = payload;
        const user = await User.findById(userId);//le decimos a mongoose que busque ese userId en la coleccion de User en mongoDB
        req.user = user;
        next();//esto indica que nuestro middleware ha finalizado y podremos llamar un siguiente middleware en el case de ser necesario
    });
};