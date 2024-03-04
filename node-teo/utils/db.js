const mongoose = require("mongoose");

const pass =
  "mongodb+srv://mtbleuz:RHuS5FrK5vndjv6L@cluster0.wchz3kd.mongodb.net/music?retryWrites=true&w=majority&appName=Cluster0";

const connectMongo = async () => {
  try {
    const conn = await mongoose.connect(pass);
    console.log("INFO: Conexión a BD correcta:", conn.connection.name);
  } catch (error) {
    console.log("ERROR: (f connectMongo) ->", error.message);
  }
};
module.exports = { connectMongo };
