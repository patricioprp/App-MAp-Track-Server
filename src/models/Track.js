const mongoose = require('mongoose');

const pointSchema = new mongoose.Schema({
    timestamp: Number,
    coords:{
        latitude: Number,
        longitude: Number,
        altitude: Number,
        accuracy: Number,
        heading: Number,
        speed: Number
    }
});

const trackSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId, //aqui indicamos que este campo es el id de otro modelo/SChema
        ref:'User' //aqui especificamos a mongoose el modelo al cual hacemos referencia
    },
    name:{
        type: String,
        default:''// si no se especifica el name se lo genera vacio
    },
    locations:[pointSchema]
});

mongoose.model('Track',trackSchema);

