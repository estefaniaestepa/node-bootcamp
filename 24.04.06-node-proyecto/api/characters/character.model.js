const mongoose = require("mongoose");  //es una libreria de node que te permite

const characterSchema = new mongoose.Schema({  //este modelo no es el definitivo
  name: {type: String, required: true, trim: true, unique: true}, //el unico para metro obligado es type
  age: {type: Number},
  weigth: {type: Number},
  description: {type: String, required: true}  //quitamos el trim porque son parrafos, si decimos que limpie por espacios por saltos de linea es mejor quitarlos
});

const Character = mongoose.model('Character', characterSchema); //le decimos que convierta el schema en un modelo que pueda procesar

module.exports = Character;  //ponemos en nombre en mayuscula porque son modelos o clases, para diferenciar que son entidades abstractas