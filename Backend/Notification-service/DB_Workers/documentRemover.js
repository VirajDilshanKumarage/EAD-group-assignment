const notification = require('../models/notification');
const logMessage = require('../logger');
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

const deleteDocument = async (email) => {
    try{
        await notification.deleteOne({ email });
    }catch(err){
        logMessage.logger('ERROR deleting document',err)
    }
}

module.exports = {deleteDocument}