const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { validationPassword, validationEmail } = require("../../utils/validate");

const userSchema = new mongoose.Schema({         //el esquema de usuario
  email: { type: String, trim: true, required: true },
  password: { type: String, trim: true, required: true },
});

userSchema.pre("save", function (next) {  //aqui añadimos que el password tienga cierta verificacion al igual que el email
  if (!validationPassword(this.password)) {
    return next(setError("404", "The password does not meet the requirements"));
  }
  if (!validationEmail(this.email)) {
    return next(setError("404", "The email is not correct"));
  }

  this.password = bcrypt.hashSync(this.password, 10);  //encriptamos el password con las reglas que le hemos añadido
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
