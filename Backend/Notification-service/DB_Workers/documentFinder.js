const logMessage = require('../logger.js');
const notification = require('../models/notification');
const databaseConnection = require('../databaseConnection.js');
const DB_URL = 'mongodb+srv://chandulakavishka0:ecomEAD@cluster0.bcd7kuy.mongodb.net/';
//make the database connection
// class Database {
//   constructor(DB_URL){
//     this.DB_URL = DB_URL
//   }

//   makeConnection(){
//     databaseConnection.db_connection(this.DB_URL)
//   }

// }
// const db = new Database(DB_URL);
// db.makeConnection();

const dbInstance = new databaseConnection.Database;
dbInstance.setUrl(DB_URL);
dbInstance.connect();

const findDocment = async (email) => {
    try{
        return await notification.findOne({ email });
    }catch(err){
        logMessage.logger('ERROR finding document',err)
    }

}

module.exports = {findDocment}

