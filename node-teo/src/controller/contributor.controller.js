// Un controlador va a tener todas las funciones que vamos a necesitar para devolver datos al usuario.

const Contributor = require("../model/contributor.model");
const HTTPSTATUSCODE = require("../../utils/httpStatusCode");

// FUNCIONES CRUD (acrónimo de "Consultar, Crear, Actualizar y Borrar", que son las 4 cosas que se pueden hacer con una base de datos)

// CONSULTAR...
// ...UN CONTRIBUIDOR
const getContributor = async (req, res, next) => {
  try {
    // 1. OBTENGO LA ID QUE HA SOLICITADO EL USUARIO
    const id = req.params.id;
    // 2. BUSCO EN LA BBDD POR ID
    const contributor = await Contributor.findById(id);
    // 3. RESPONDO AL USUARIO
    res.status(200).json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      contributor: contributor,
    });
  } catch (error) {
    next(error);
  }
};

// ...TODOS LOS CONTRIBUIDORES
const getContributors = async (req, res, next) => {
  // Cambiamos de getContributor a getContributors
  try {
    // 1. BUSCO TODAS LAS TRACKS
    const contributors = await Contributor.find();
    // 2. RESPONDO AL USUARIO
    res.status(200).json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      contributors: contributors,
    });
  } catch (error) {
    next(error);
  }
};

// CREAR
const createContributor = async (req, res, next) => {
  try {
    //1. CREAR UNA VARIABLE (TIPO CONTRIBUTOR) QUE RECOJA LOS DATOS QUE ENVIA EL USUARIO
    const contributor = new Contributor(req.body);
    // 2. GUARDAR EN BBDD
    await contributor.save();
    // 3. CONTESTAR AL USUARIO
    res.status(201).json({
      status: 201,
      message: HTTPSTATUSCODE[201],
      contributor: contributor,
    });
  } catch (error) {
    next(error);
  }
};

// ACTUALIZAR
const updateContributor = async (req, res, next) => {
  try {
    // 1. BUSCAR EL CONTRIBUIDOR QUE HAY QUE MODIFICAR
    const id = req.params.id;
    // 2. RECOPILAR LOS DATOS QUE HAY QUE MODIFICAR
    const body = req.body;
    // 3. ACTUALIZAR LA FUNCIÓN
    const contributor = await Contributor.findByIdAndUpdate(id, body, { new: true });
    // 4. CONTESTAR AL USUARIO
    if (!contributor) {
      return res.status(404).json({
        status: 404,
        message: HTTPSTATUSCODE[404],
      });
    }
    res.status(200).json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      data: contributor,
    });
  } catch (error) {
    next(error);
  }
};

// BORRAR
const deleteContributor = async (req, res, next) => {
  try {
    // 1. BUSCAR EL CONTRIBUIDOR QUE HAY QUE BORRAR
    const id = req.params.id;
    // 2. ACTUALIZAR LA FUNCIÓN
    const contributor = await Contributor.findByIdAndDelete(id);
    // 4. CONTESTAR AL USUARIO
    if (!contributor) {
      return res.status(404).json({
        message: "Contribuidor no encontrado", //Hemos piesto un mensaje de error personalizado. Sería lo mismo que poner "message: HTTPSTATUSCODE[404]"
      });
    }
    res.status(200).json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      data: contributor,
    });
  } catch (error) {
    next(error);
  }
};

// Por último, exportamos las diferentes funciones creadas.
module.exports = { getContributor, getContributors, createContributor, updateContributor, deleteContributor };
