const User = require("./user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const register = async (req, res, next) => {   //esto es para un create
  try {
    const user = new User(req.body);

    const userExist = await User.findOne({ email: user.email });  //comprobamos si el user existe
    if (userExist) {
      return new Error("This email has already been used.");  
    }
    const userDB = await user.save(); //el 201 es que es creado
    return res.json({
      status: 201,
      message: `User ${userDB.email} created`,
    });
  } catch (error) {
    return next(error);
  }
};

const login = async (req, res, next) => {  //si es un async se va fuera del entorno
  try {
    const userInfo = await User.findOne({ email: req.body.email }); //email es lo que tenemos en nuestro sistema de identificacion que tenemos en user.model.js
    console.log(bcrypt.compareSync(req.body.password, userInfo.password)); //nos aseguramos de que nos llegan cosas
    if (bcrypt.compareSync(req.body.password, userInfo.password)) {  //hacemos una llamada a una libreria conparamos con el password de nuestra base de datos y comparamos con password que ha facilitado el cliente 
      userInfo.password = "*************"; // ocultamos el dato password en la respuesta por seguridad, si esto funciona lo ofuscamos si coinciden
      const token = jwt.sign(  //generamos un token
        { 
          id: userInfo._id,
          email: userInfo.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: "30m" } //le decimos que caduque en 30min
      );

      return res.status(200).json({  //si todo ha ido bien devolvemos el tocken y así el cliente se queda ese toquen.
        data: { massage: "ok", user: userInfo, token: token },
      });
    } else {
      return res.json({
        status: 400,
        message: "invalid credentials",
        data: null,
      });
    }
  } catch (error) {
    return next(error);
  }
};

const logout = (req, res, next) => { //aqui te quita el pase
  try {
    const token = null; //aqui te quita tu pase hasta que indiques correctamente las credenciales
    return res.status(200).json({
      status: 200,
      message: "Logout successful",
    });
  } catch (error) {
    return next(setError(error.statusCode, "Logout Error"));
  }
};

module.exports = { register, login, logout };
