// librerías importadas
const express = require('express');
const cors = require('cors');
// componentes "míos" que voy a utilizar
const HTTPSTATUSCODE = require('./utils/httpStatusCode');
const { connectMongo } = require('./utils/db-artist');
const artistRouter = require('./src/routes/artist.routes');
// imports de routes

const PORT = 3001;
//si da error puede ser que sea por el 3000 y le tendremos que cambiar el númeronpm run dev



// CONFIGURACION
connectMongo();
const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Methods', 'GET,PATCH,POST,DELETE');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Content-Type');
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
app.use('/artist', artistRouter);

// ruta de bienvenida
app.get('/', (request, response) => {
  response.status(200).json({
    message: 'Welcome to my server',
    app: 'My App'
  });
});

/* MANEJO DE ERRORES */

app.use((request, response, next) => {
  let error = new Error();
  error.status = 404;
  error.message = HTTPSTATUSCODE[404];
  next(error);
});

app.use((error, request, response, next) => {
  return response.status(error.status || 500).json(error.message || 'Unexpected error');
})

app.disable('x-powered-by');

/* DEFINIR EL PUERTO E INICIAR LA ESCUCHA */
app.listen(PORT, () => {
  console.log(`app running in port ${PORT}`);
});