const express = require('express');

const router = express.Router();

const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');

const User  = mongoose.model('User');

router.post('/signup',async (req,res) => {

    const {email,password} = req.body; //almacenos los valores del body del post en las variables email y password

    try {
    const user = new User({email,password});//Instanciamos el schema de user con lso datos del post body
    await user.save();

    const token = jwt.sign({userId: user._id},'MY_SECRET_KEY');
       res.send({token});
    } catch (err){
    return res.status(422).send(err.menssage);
    }
});

module.exports = router;