const mongoose = require('mongoose');

const RadioSchema = new mongoose.Schema({
    radiobasedsc: String,
    fecha: String,
    region: String,
    trafico: String
});
var Radio = function(modelo){
};



module.exports = mongoose.model('radiodatabases',RadioSchema);
