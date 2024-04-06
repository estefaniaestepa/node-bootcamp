//1.IMPORTS ->NPM(LIBRERIA); MODULOS PROPIOS
const express = require("express");
require ('dotenv').config();
const characterRouter = require("./api/characters/character.router");
const {connectMongo} = require("./utils/db"); //dependiendo el tipo de conexion porque le opcion de pasar varios parametros

/* console.log(process.env); */

//2.CONFIGURACION 
//MI API VA A UTILIZAR FORMATO JSON, Y VA A PERMITIR CIERTO TIPO DE CONEXIONES
const PORT = process.env.PORT || 3000;  //QUE SE CONECTE EN LA VARIABLES DE ENTORNO.ENV SI NO LO ENCUENTRA EN EL PUERTO 300
const app = express();
app.use(express.json()); //EJECUTAR EXPRESS 
app.use(express.urlencoded({ extended: true })); //QUE PROCESE LA CODIFICACION URL
app.use((req, res, next) => {   //SON LAS REGLAS DE CABECERA
res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH");  //PUT: COGE EL OBJETO NUEVO Y SE CARGA EL ANTERIOR Y ASIGNA LA ID AL NUEVO// PATCH: SOLO LO MODIFICA PARCIALMENTE
res.header("Access-Control-Allow-Credentials", true);
res.header("Access-Control-Allow-Headers", "Content-Type");  //ESTO ES PARA CUANDO ENVIAMOS ARCHIVOS
next();
});
connectMongo();

//3.ENDPOINTS (SON LAS RUTAS, ES COMO UN LINK QUE TE LLEVA A UN SITIO QUE ESCRIBE SU USUARIO EN SU NAVEGADOR)

app.get('/', (req, res)=>{  //1.la ruta del endpoint, 2.controlador
 res.json({message: "El servidor esta funcionando"}); //ponemos unas llaves porque nos tiene que devolver un objeto
});

app.use("/characters", characterRouter); //todas las rutas de characters comparten esto 

//4. GESTION DE ERRORES O MANEJO DE EXPEPCIONES


//5.ACTIVAR (es la funcion lisen)

app.listen(PORT,  ()=>{
console.log(`El servidor se ha iniciado en el puerto: ${PORT}`);
});