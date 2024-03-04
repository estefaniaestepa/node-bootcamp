// Un controlador va a tener todas las funciones que vamos a necesitar para devolver datos al usuario.

const Track = require("../model/track.model");
// const Contributor = require("../model/contributor.model");
const HTTPSTATUSCODE = require("../../utils/httpStatusCode");

// FUNCIONES CRUD (acrónimo de "Consultar, Crear, Actualizar y Borrar", que son las 4 cosas que se pueden hacer con una base de datos)

// CONSULTAR...
// ...UNA CANCIÓN
const getTrack = async (req, res, next) => {
  try {
    // 1. OBTENGO LA ID QUE HA SOLICITADO EL USUARIO
    const id = req.params.id;
    // 2. BUSCO EN LA BBDD POR ID
    const track = await Track.findById(id).populate("contributors");
    // 3. RESPONDO AL USUARIO
    res.status(200).json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      data: track,
    });
  } catch (error) {
    next(error);
  }
};

// ...TODAS LAS CANCIONES
const getTracks = async (req, res, next) => {
  // Cambiamos de getTrack a getTracks
  try {
    // 1. BUSCO TODAS LAS TRACKS
    const tracks = await Track.find().populate("contributors");
    // 2. RESPONDO AL USUARIO
    res.status(200).json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      data: tracks,
    });
  } catch (error) {
    next(error);
  }
};

// CREAR
const createTrack = async (req, res, next) => {
  try {
    //1. CREAR UNA VARIABLE (TIPO TRACK) QUE RECOJA LOS DATOS QUE ENVIA EL USUARIO
    const track = new Track(req.body);
    // 2. GUARDAR EN BBDD
    await track.save();
    // 3. CONTESTAR AL USUARIO
    res.status(201).json({
      status: 201,
      message: HTTPSTATUSCODE[201],
      data: track,
    });
  } catch (error) {
    next(error);
  }
};

// ACTUALIZAR
const updateTrack = async (req, res, next) => {
  try {
    // 1. BUSCAR EL TRACK QUE HAY QUE MODIFICAR
    const id = req.params.id;
    // 2. RECOPILAR LOS DATOS QUE HAY QUE MODIFICAR
    const body = req.body;
    // 3. ACTUALIZAR LA FUNCIÓN
    const track = await Track.findByIdAndUpdate(id, body, { new: true });
    // 4. CONTESTAR AL USUARIO
    if (!track) {
      return res.status(404).json({
        status: 404,
        message: HTTPSTATUSCODE[404],
      });
    }
    res.status(200).json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      data: track,
    });
  } catch (error) {
    next(error);
  }
};

// BORRAR
const deleteTrack = async (req, res, next) => {
  try {
    // 1. BUSCAR EL TRACK QUE HAY QUE BORRAR
    const id = req.params.id;
    // 2. ACTUALIZAR LA FUNCIÓN
    const track = await Track.findByIdAndDelete(id);
    // 4. CONTESTAR AL USUARIO
    if (!track) {
      return res.status(404).json({
        message: "Track no encontrada", //Hemos puesto un mensaje de error personalizado. Sería lo mismo que poner "message: HTTPSTATUSCODE[404]"
      });
    }
    res.status(200).json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      data: track,
    });
  } catch (error) {
    next(error);
  }
};

// Por último, exportamos las diferentes funciones creadas.
module.exports = { getTrack, getTracks, createTrack, updateTrack, deleteTrack };
