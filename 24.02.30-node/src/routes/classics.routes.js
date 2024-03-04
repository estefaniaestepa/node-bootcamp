const express = require("express");
const classicsRouter = express.Router();
const { createClassic } = require('../controllers/classics.controller')

classicsRouter.get("/", (req, res, next) => {
  res.status(200).json({
    // json siempre tiene clave y valor
    status: 200, // le damos un status porque va bien a la hora de depurar cosas
    message: "Get Bike",
    app: "My app",
  }); // 200 == todo ha ido bien
});
/* classicsRouter.post("/", (req, res, next) => {
  res.status(200).json({
    // json siempre tiene clave y valor
    status: 200, // le damos un status porque va bien a la hora de depurar cosas
    message: "Post classics",
    app: "My app",
  }); // 200 == todo ha ido bien
}); */

classicsRouter.post('/', createClassic);

module.exports = classicsRouter;
