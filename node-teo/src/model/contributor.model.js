const mongoose = require("mongoose");

const contributorSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    trim: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    //Ejemplos de roles: compositor, cantante, dj, violinista, manager, etc
    type: String,
    required: true,
    trim: true,
  },
  country: {
    type: String,
    required: true,
    trim: true,
  },
  birthday: {
    //Tiene que tener ese formato: 1970-01-01
    type: String,
    required: true,
    trim: true,
  },
  genre: {
    // Estílo de música
    type: String,
    required: true,
    trim: true,
  },
});

const Contributor = mongoose.model("Contributor", contributorSchema);

module.exports = Contributor;
