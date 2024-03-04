const express = require("express"); // express es como el motor que hace que funcione todo esto. Es la librería que contiene las instrucciones para las rutas. El 'require' sirve para importar esa librería.
const userRouter = express.Router(); // Router siendo una clase, llamamos a esa clase para que se instancie. La clase Router está recogida dentro de la librería 'express'.

// Instanciamos al controlador para usar las funciones relativas a cada ruta.
const {
  createUser,
  authenticate,
  logout,
  getUsers,
} = require("../controller/user.controller");

const { isAuth } = require("../middlewares/auth.middleware"); // Llamamos a la función de autentificación que servirá de policía (definir quién entra y quién no).

// DEFINIMOS LAS RUTAS

// Metemos al policía [isAuth] en las funciones que puedan alterar a nuestra base de datos, aunque sería más seguro ponerlo en todas. Gracias a esto, nos aseguramos que la persona que entra sea alguién que hemos autorizado.

// Por norma general, todas las rutas relacionadas con la autentificación tienen el tipo de petición 'post'.
userRouter.post("/register", createUser); // El parámetro '/register' se puede llamar como queramos (/signUp, etc)
userRouter.post("/authenticate", authenticate); // obtener un token, es como una clave temporal. // No necesitamos [isAuth] porque la accíon de autentificarse es la propia acción de tener autorización. Es como sacarse el DNI: lo sacas porque no lo tienes.
userRouter.post("/logout", [isAuth], logout); // el token se destruye
userRouter.get("/users", getUsers); // ESO ES UNA PRUEBA, HAY QUE BORRARLO ANTES DE PASAR A PRODUCCIÓN. SI LO DEJAMOS EN UN PROYECTO REAL, TODA LA GENTE PODRÍA VER LOS USUARIOS QUE TENEMOS.

module.exports = userRouter; // Eso es para poner el userRouter a la disposición del resto de la app.

// Para que nuestra app sepa que ese archivo de rutas existe, tenemos que enlezarlo en el index.
