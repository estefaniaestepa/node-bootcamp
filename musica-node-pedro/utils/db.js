const mongoose = require('mongoose');

const pass = 'mongodb+srv://dev3pgonzalez:6dUwAq3As4st6hge@cluster0.navam8i.mongodb.net/albums?retryWrites=true&w=majority';

const connectMongo = async () => {
    try {
        const conn = await mongoose.connect(pass);
        console.log('INFO: Conexión a BD correcta:', conn.connection.name)
    } catch (error) {
        console.log('ERROR: (f connectMongo) ->', error.message);
    }
}

module.exports = { connectMongo };