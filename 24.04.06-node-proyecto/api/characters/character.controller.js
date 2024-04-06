const Character = require("./character.model");


//FUNCIONES CRUD
//1.CREATE CREAMOS LA FUNCION PARA CREAR COSAS

const create = async(req, res, next) =>{  //next si se produce un error se deriva a otra funcion que gestiona errores
   try { //para crear un personaje nuevo
     const character = await Character.create(req.body); //el cliente nos pasa la informacion a traves del body . Lo de req.body es lo que ponemos en postman
      res.json({
      status: 201, //creado
      msg: "creado",
      data: character,
    });
    } catch (error) {
    next(error); //si se produce un error lo mandamos para fuera, este error lo deriva en el index y desde ali se maneja el control de errores. Next es una funcion propia de Node
   }
};

const getOne =  async(req, res, next) =>{
  try {
    const id = req.params.id;  //id es la que genera mongoose
    const characters = await Character.findById(id); //findByid se pasa por la url por el id, esto lo ponemos en mongo. No hay dos objetos en nuestra base de 
    res.json({
      status: 200, //un 200 es un ok
      msg: "creado",
      data: characters,
    });
  } catch (error) {
    next(error);
  } 
};

const getOneByName =  async(req, res, next) =>{
  try {
    const id = req.params.name;
    const character = await Character.findOne({name: name}); //findOne se busca por nombre y se le pasa un objeto name: name . Solo lo utilizamos para usar datos no para el manejo 
    res.json({
      status: 200, //un 200 es un ok
      msg: "creado",
      data: characters,
    });
  } catch (error) {
    next(error);
  } 
};

const getAll =  async(req, res, next) =>{
  try {
    const characters = await Character.find(); //find es el metodo para buscar todos los caracters
    res.json({
      status: 200, //un 200 es un ok
      msg: "creado",
      data: characters,
    });
  } catch (error) {
    next(error);
  }
};

 const updateOne = async(req, res, next) =>{
  try {
    const id = req.params.id;
    const body = req.body; //nos pasa los parametros que vayamos a editar
    const character = await Character.findByIdAndUpdate(id, body,  {new: true}); //{new: true} esto son añadidos
    res.json({
      status: 200, //un 200 es un ok
      msg: "creado",
      data: characters,
    });
  } catch (error) {
    next(error);
  }
 };

 const deleteOne = async(req, res, next) =>{
try {
  const id = req.params.id;
  const character = await Character.findByIdAndDelete(id);
  res.json({
    status: 200, //un 200 es un ok
    msg: "creado",
    data: characters,
  });
} catch (error) {
  next(error);
}
 }

module.exports = {create, getOne, getAll, getOneByName, updateOne, deleteOne};