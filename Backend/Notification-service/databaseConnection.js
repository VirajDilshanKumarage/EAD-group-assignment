const mongoose = require('mongoose');

//const DB_URL = 'mongodb+srv://chandulakavishka0:ecomEAD@cluster0.bcd7kuy.mongodb.net/'

const db_connection = (DB_URL) => {
    mongoose.connect(DB_URL,)
        .then(() => {
            console.log('DB connected');
        })
        .catch((err) => console.log('DB connection error', err));
}

module.exports = {db_connection}
//export default db_connection;