// PROCESO
//En index.js, va a llegar una petición y se va a manejar. Index va a llamar a las rutas. La ruta va a indentificar que tipo de petición es, lo va a derivar al controlador y el controlador, para trabajar, va a utilizar el modelo para cumplir con los requisitos de la aplicación (que datos tienen que aparecer?).

// librerías importadas
const express = require("express");
const cors = require("cors");
// componentes "míos" que voy a utilizar
const HTTPSTATUSCODE = require("./utils/httpStatusCode");
const { connectMongo } = require("./utils/db");

// LLAMAMOS A LAS RUTAS (importamos nuestros archivos de rutas)
const trackRouter = require("./src/routes/track.routes"); // para track.model.js
const contributorRouter = require("./src/routes/contributor.routes"); // para artist.model.js
const userRouter = require("./src/routes/user.routes"); // para user.model.js

const PORT = 3000;

// CONFIGURACION
connectMongo();
const app = express();

// app.use(mongoSanitize()); // ESTO NO HACE FALTA
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Methods", "GET,PATCH,POST,DELETE");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
/* app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:4200'],
    credentials: true,
})); */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ROUTES */
app.use("/track", trackRouter);
app.use("/contributor", contributorRouter);
app.use("/user", userRouter); // Llamamos a las rutas con el endpoint
app.use(express.urlencoded({ extended: true }));

// ruta de bienvenida
//Aquí tenemos una ruta y un mimi controlador, está todo junto.
app.get("/", (request, response) => {
  response.status(200).json({
    message: "Welcome to my server",
    app: "My App",
  });
});

/* MANEJO DE ERRORES */

app.use((request, response, next) => {
  let error = new Error();
  error.status = 404;
  error.message = HTTPSTATUSCODE[404];
  next(error); // El next va a derivar el error y su tipo a su padre
});

app.use((error, request, response, next) => {
  return response
    .status(error.status || 500)
    .json(error.message || "Unexpected error");
});

app.disable("x-powered-by");

/* DEFINIR EL PUERTO E INICIAR LA ESCUCHA */
app.listen(PORT, () => {
  console.log(`app running in port ${PORT}`);
});
