require('./models/User');//hay que cargar todos los modelos en el index
require('./models/Track');//hay que cargar todos los modelos en el index
const express = require('express'); //creamos una app de express

const mongoose = require('mongoose');//para poder conectarnos remotamente con mongo cloud

const bodyParser = require('body-parser');

const trackRoutes = require('./routes/trackRoutes');

const authRoutes = require('./routes/authRoutes');

const requireAuth = require('./middlewares/requireAuth');

const app = express();// creamos un objeto de express

app.use(bodyParser.json());

//asociaremos todos los manejadores de rutas con nuesta app principal
app.use(authRoutes);

app.use(trackRoutes);

//const mongoURI = 'mongodb+srv://admin:admin@cluster0.9gb3l.mongodb.net/<dbname>?retryWrites=true&w=majority'
//se devio cambiar el link por la version de node, la de la linea de arriba es una version 3.6 o superior
//la de abajo es una version 2.2.12 o superior, el problema de las versiones lo tiene mongoose
const mongoURI = 'mongodb://admin:admin@cluster0-shard-00-00.9gb3l.mongodb.net:27017,cluster0-shard-00-01.9gb3l.mongodb.net:27017,cluster0-shard-00-02.9gb3l.mongodb.net:27017/<dbname>?ssl=true&replicaSet=atlas-9uznoh-shard-0&authSource=admin&retryWrites=true&w=majority';

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
//agregamos el middleware requireAuth
app.get('/',requireAuth,(req,res) => {
    res.send(`Your email: ${req.user.email}`);
});

//Definimos el puerto por el cual se escuchara la app
app.listen(3001, () => { 
    console.log('Estamos escuchando en el puerto 3001');
});