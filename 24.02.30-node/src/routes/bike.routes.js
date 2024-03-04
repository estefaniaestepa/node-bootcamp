const express = require("express");
const bikeRouter = express.Router();
const { createBike } = require('../controllers/bike.controller');

bikeRouter.get("/", (req, res, next) => {
  res.status(200).json({
    // json siempre tiene clave y valor
    status: 200, // le damos un status porque va bien a la hora de depurar cosas
    message: "Get Classics",
    app: "My app",
  }); // 200 == todo ha ido bien
});
bikeRouter.post("/", (req, res, next) => {
  res.status(200).json({
    // json siempre tiene clave y valor
    status: 200, // le damos un status porque va bien a la hora de depurar cosas
    message: "Post Classics",
    app: "My app",
  }); // 200 == todo ha ido bien
});

bikeRouter.post('/', createBike);

module.exports = bikeRouter;
