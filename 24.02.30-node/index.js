//IMPORTS
const express = require("express");
const cors = require("cors");
const HTTPSTATUSCODE = require('./utils/httpStatusCode');
const { connectMongo } = require("./utils/db");
const classicsRouter = require('./src/routes/classics.routes')
const PORT = 3000;

// CONFIG
connectMongo();
const app = express();
// header control
app.use((req, res, next) => { //las peticiones http (son las cabeceras), estos parametros se utilizan obligatoriamente (req, res)
  res.header('Access-Control-Allow-Methods', 'GET,PATCH,POST,DELETE'); //aqui le decimos que deje entrar a peticiones con credenciales GET,PATCH,POST,DELETE
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Content-Type'); //es lo que vamos a autorizar al json 
  next();
});
app.use(cors()); //origines de las peticiones de terceros o cruzadas, lo ponemos vacio para demostrar 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//ENDPOINTS
app.get("/", (req, res, next) => {
  res.status(200).json({
    // json siempre tiene clave y valor
    status: 200, // le damos un status porque va bien a la hora de depurar cosas
    message: "Welcome to my server",
    app: "My app",
  }); // 200 == todo ha ido bien
});

app.use('/api/classics', classicsRouter);

// MANEJO DE ERRORES
app.use((req, res, next) => {
  let error = new Error();
  error.status = 404;
  error.message = HTTPSTATUSCODE[404];
  next(error);
});
app.use((error, req, res, next) => {
  return res.status(error.status || 500).json(error.message || 'Unexpected error');
})

// ESCUCHA
app.listen(PORT, () => {
  console.log(`app running in port ${PORT}`);
});