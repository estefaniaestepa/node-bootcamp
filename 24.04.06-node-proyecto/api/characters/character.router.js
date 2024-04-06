const express = require("express"); //express es una libreria que importamos a mano

const characterRouter = express.Router(); //le diremos que añada las rutas de caracteres

//funciones de control los controladores

const {
  create,
  getOne,
  getAll,
  getOneByName,
  updateOne,
  deleteOne,
} = require("./character.controller");

//les definimos las rutas unicas
characterRouter.post("/", create);
characterRouter.get("/:id", getOne);
characterRouter.get("", getAll);
characterRouter.get("/:name", getOneByName);
characterRouter.patch("/:id", updateOne); //patch es para editar, cambiar parametros dentro de ese mismo objeto. Manteniendo la id, obliga a que demos todos los datos de nuevo
characterRouter.delete("/:id", deleteOne);

module.exports = characterRouter;
