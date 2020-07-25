const express = require('express');

const router = express.Router();

const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');

const User  = mongoose.model('User');

router.post('/signup', async (req, res) => {

    const { email, password } = req.body; //almacenos los valores del body del post en las variables email y password

    try {
    const user = new User({ email, password });//Instanciamos el schema de user con lso datos del post body
    await user.save();

    const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY');
       res.send({ token });
    } catch (err) {
    return res.status(422).send(err.message);//aqui nos muestra el error si es que por ejemplo el usuario ya existe
    }
});

router.post('/signin',async (req,res) => {
    const { email, password } = req.body;
    //si no hay correo electronico o no hay contraseña
    if(!email||!password){
        return res.status(422).send({error:'Must provide email and password'});
    }

    const user = await User.findOne({email});

    if(!user){
        return res.status(422).send({error:'Invalid password or email'});
    }

    try {
    await user.comparePassword(password);
    const token = jwt.sign({userId:user._id},'MY_SECRET_KEY');
    res.send({token});
        }catch(err){
        return res.status(422).send({err:'Invalid password or email'});
        }
});

module.exports = router;