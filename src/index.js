const express = require('express'); //creamos una app de express

const mongoose = require('mongoose');//para poder conectarnos remotamente con mongo cloud

const app = express();// creamos un objeto de express

const mongoURI = 'mongodb+srv://admin:admin@cluster0.9gb3l.mongodb.net/<dbname>?retryWrites=true&w=majority'

mongoose.connect(mongoURI,{

    useNewUrlParser:true, //esto es para evitar los mensjaes de errores en la consola
    useCreateIndex:true
});

mongoose.connection.on('connected',() => {
    console.log('Esto se ejecuta siempre que la conexion con mongodb se realizo con exito');
});

mongoose.connection.on('error',(err) => {
    console.error('Error al conectar con mongo db',err);
});

app.get('/',(req,res) => {
    res.send('Hola !');
});

//Definimos el puerto por el cual se escuchara la app
app.listen(3000, () => { 
    console.log('Estamos escuchando en el puerto 3000');
});