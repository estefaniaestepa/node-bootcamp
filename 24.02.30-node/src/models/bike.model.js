const mongoose = require('mongoose');
const bikeSchema = new mongoose.Schema({
  plate: {
    type: String,
    required: [true, 'Una moto debe tener matrícula'], //este es el mensaje que saldrá
    unique: true,
    trim: true,
    minlength: 6
  },
  model: {
    type: String,
    required: [true, 'Una moto debe tener modelo'],
    trim: true,
  },
  year: {
    type: Number,
    required: [true, 'Una moto debe tener año'],
    trim: true,
  },
  condition: {
    type: String,
    required: [true, 'Una moto debe tener estado'],
    trim: true,
  }
});
const Bike = mongoose.model('Bike', bikeSchema);
module.exports = Bike;