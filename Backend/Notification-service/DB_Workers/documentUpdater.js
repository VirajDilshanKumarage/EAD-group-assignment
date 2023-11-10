const logMessage = require('../logger');
const databaseConnection = require('../databaseConnection.js');
const DB_URL = 'mongodb+srv://chandulakavishka0:ecomEAD@cluster0.bcd7kuy.mongodb.net/';
//make the database connection
class Database {
  constructor(DB_URL){
    this.DB_URL = DB_URL
  }

  makeConnection(){
    databaseConnection.db_connection(this.DB_URL)
  }

}
const db = new Database(DB_URL);
db.makeConnection();

const updateDocument = async (document) => {
    try{
       await document.save();
    }catch(err){
        logMessage.logger('ERROR updating document',err)
    }
}

module.exports = {updateDocument}