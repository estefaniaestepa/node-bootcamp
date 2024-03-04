// Esto sirve para establecer la seguridad de nuestros usuarios

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const salt = 10; // Ese dato sirve para decir cuanta complejidad tenemos que dar a esa encriptación. 10 es el número de niveles de complejidad.

const userSchema = new mongoose.Schema({
  name: { type: String, unique: true, trim: true, required: true },
  password: { type: String, trim: true, required: true },
});

// Esa función sirve para que se encripten, por ley de protección de datos es obligatorio.
userSchema.pre("save", (next) => {
  if (this.password) {
    this.password = bcrypt.hashSync(this.password, salt); // bcrypt es una librería que sirve para encriptar. Se hace a traves de un algortimo.
  }
  next();
});

const User = mongoose.model("users", userSchema);
module.exports = User;
