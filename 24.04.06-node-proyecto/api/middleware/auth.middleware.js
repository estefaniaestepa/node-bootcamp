const jwt = require("jsonwebtoken");

const isAuth = (req, res, next) => {               //Dentro de esta funcion el cliente nos va a pasar un token a traves del header
  const authorization = req.headers.authorization;
  const secret = req.app.get("secretKey") || process.env.JWT_SECRET;  //este codigo secreto lo cogemos a traves de las process.env.JWT_SECRET

  if (!authorization) {  //si no nos manda autorizacion 
    return res.json({
      status: 401,
      message: "Unauthorized",  
      data: null,
    });  //le delvolvemos un no autorizado
  }

  const splits = authorization.split(" ");  
  if (splits.length != 2 || splits[0] != "Bearer") {
    return res.json({
      status: 400,
      message: "Bad Request",
      data: null,
    });
  }

  const jwtString = splits[1];  //esto es el token real

  try {
    var token = jwt.verify(jwtString, secret);  //este token lo cmomparamos con la clave secreta
  } catch (error) {
    return next(error);
  }

  const authority = {
    id: token.id,
    name: token.name,
  };
  req.authority = authority;
  next();
};

module.exports = {
  isAuth,
};

//ESTO ES UN CONTROL DE ACCESO PARA SABER SI EL TOKEN ES VALIDO O NO
