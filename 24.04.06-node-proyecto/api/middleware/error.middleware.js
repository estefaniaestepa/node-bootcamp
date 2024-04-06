const notFoundHandler = (req, res, next) => {
  const error = new Error(`Route not found - ${req.originalUrl}`);  //nos devuelve lo que hemos puesto para saber el tipo de error
  res.status(404);  //este es el tipo de error
  next(error);
};

//devolvemos errores del sistema
const errorHandler = (error, req, res, next) => {   //estos son los parametros
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;  //si tenemos un statusCode de error 200 lo pasamos a 500, porque no podemos tener un error con status 200
  res.status(statusCode);
  res.json({   //el error lo devolvemos a traves de un json
    status: statusCode,
    message: error.message,
    stack: process.env.NODE_ENV === "production" ? "" : error.stack,  //es el detalle profundo de los errores
  });
};

module.exports = {
  notFoundHandler,
  errorHandler,
};


//ESTO LO IMPORTAMOS AL INDEX.JS