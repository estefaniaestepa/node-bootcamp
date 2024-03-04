//IMPORTAR MODULOS Y VARIABLES
const express = require("express");

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

//localhost:<PORT>/persona
app.get("/persona", (request, response) => {
  response.json({
    nombre: "Juan",
    apellidos: "González Sánchez",
  });
});

app.get("/params", (request, response) => {
  const params = request.query;
  response.send(params);
});

app.get("/ciudad", (req, res) => {
  const city = req.query.name;
  const ciudades = {
    madrid: "6000000",
    barcelona: "3000000",
    sevilla: "700000",
    avila: "60000",
  };

  //nos han pasado un nombre?
  if (!city) {
    res.send("falta el nombre");
  }
  // el nombre que nos han pasado está en la "base de datos"?
  if (!ciudades.hasOwnProperty(city)) {
    res.send("la ciudad no está en la lista");
  }

  res.send(`La poblacion de ${city} es ${ciudades[city]}`);
});

app.get("/postres", (req, res) => {
  const ciudad = req.query.name;
  const postresTipicos = {
    cadiz: "Pan de Cádiz",
    teruel: "Suspiros de Amante",
    baleares: "La ensaimada",
    albacete: "Los Miguelitos",
  };

  //nos han pasado un nombre?
  if (!ciudad) {
    res.send("falta el nombre");
  }
  // el nombre que nos han pasado está en la "base de datos"?
  if (!postresTipicos.hasOwnProperty(ciudad)) {
    res.send("la ciudad no está en la lista");
  }
  res.send(`La ciudad de ${ciudad} , su postre típico es: ${postresTipicos[ciudad]}`);
});



/***************/
app.get("/ciudades", (req, res) => {
  const ciudades = [
    {
      nombre: "Madrid",
      comunidad: "Comunidad de Madrid",
      habitantes: 6000000,
      capital: "Avila",
    },
    {
      nombre: "Barcelona",
      comunidad: "Cataluña",
      habitantes: 3000000,
      capital: "Avila",
    },
    {
      nombre: "Sevilla",
      comunidad: "Andalucía",
      habitantes: 700000,
      capital: "Avila",
    },
    {
      nombre: "Valencia",
      comunidad: "Comunidad Valenciana",
      habitantes: 300000,
      capital: "Avila",
    },
    {
      nombre: "Avila",
      comunidad: "Castilla y Leon",
      habitantes: 600000,
      capital: "Avila",
    },
  ];
});

const nombre = req.query.nombre;
const data = req.query.data;
ciudades.forEach((ciudad) => {
  if (ciudad.nombre.toLowerCase() == nombre) {
    if (data == "comunidad") {
      res.send(
        `La ciudad de ${ciudad.nombre} esta en la comunidad de ${ciudad.comunidad}`
      );
    } else if (data == "habitantes") {
      res.send(
        `La ciudad de ${ciudad.nombre} tiene  ${ciudad.habitantes} habitantes`
      );
    } else {
      res.send(`no existe el parametro ${data}`);
    }
  }
});

res.send("La ciudad no esta en la lista");
// MANEJO ERRORES

// ARRANCAR LA APP
app.listen(PORT, () => {
  console.log(`La aplicación se ha inicializado en el puerto: ${PORT}`);
});
