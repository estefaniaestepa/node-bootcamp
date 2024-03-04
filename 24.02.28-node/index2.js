//IMPORTAR MODULOS Y VARIABLES
const express = require("express");
const { alumnos } = require("./alumnos");

console.log(alumnos);


for (let alumno of alumnos) {
  if (alumno.id == 2) {
    console.log(alumno.asignaturas);
  }
}

const PORT = 3000; //las variables de configuración, (está prohibido cambiar) se pone en mayúsculas porque es una constante que se va a usar en toda la aplicación

//CONFIGURACION DE LA APP
const app = express(); //(objeto tipo express que se crea al inicializar) la configuración, esto configura la pp para que funcione a modo de servidor

//ENPOINTS
//localhost:<PORT>
app.get("/", (request, response) => {
  //los parametros que le pasamos es la direccion del enpoint y un callback ()
  response.send("esta es mi primera app en node");
});
//cuando resuelva request, response ejecuta el get y se ejecuta cuando llamemos a la ruta "/"


//ver todos los alumnos
app.get("/alumnos", (req, res) => {
  res.json(alumnos);
});

//ver un alumno por id
app.get("/alumno", (req, res) => {
  if (req.query.id) { //ver un alumno por id
    for (let alumno of alumnos) {
      if (alumno.id == req.query.id) {
        res.json(alumno);
      }
    }
  }
  res.send("no existe ese alumno");
});

//ver todos los examenes de una asignatura por alumno
app.get("/alumno/asiganturas", (req, res) => {
  if (req.query.id) { //ver un alumno por id
    for (let alumno of alumnos) {
      if (alumno.id == req.query.id) {
        res.json(alumno.asignaturas);
      }
    }
  }
  res.send("no existe ese alumno");
});


//ver los examenes de una asignatura de un alumno
app.get("/alumno/asigantura", (req, res) => {
  const { id, asignatura } = req.query; // (desestruccturadción)const id = req.query.id --- const asignatura = req.query.asignatura
  if (id && asignatura) {
    for (let alumno of alumnos) {
      if (alumno.id == id) {
        res.json(alumno.asignaturas[asignatura]);
      }
    }
  }
  res.send("no existe ese alumno o la asignatura");
});

//ver los examenes por trimestre
app.get("/alumno/asigantura/trimestre", (req, res) => {
  const { id, asignatura, trimestre } = req.query; // (desestruccturadción)const id = req.query.id --- const asignatura = req.query.asignatura
  if (id && asignatura) {
    for (let alumno of alumnos) {
      if (alumno.id == id) {
        res.json(alumno.asignaturas[asignatura][trimestre]);
      }
    }
  }
  res.send("no existe ese alumno o la asignatura");
});


//MANEJO ERRORES



// ARRANCAR LA APP
app.listen(PORT, () => {
  console.log(`La aplicación se ha inicializado en el puerto: ${PORT}`);
});








