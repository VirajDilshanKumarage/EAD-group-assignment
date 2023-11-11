const mongoose = require('mongoose');

//const DB_URL = 'mongodb+srv://chandulakavishka0:ecomEAD@cluster0.bcd7kuy.mongodb.net/'

// const db_connection = (DB_URL) => {
//     mongoose.connect(DB_URL,)
//         .then(() => {
//             console.log('DB connected');
//         })
//         .catch((err) => console.log('DB connection error', err));
// }

// module.exports = {db_connection}
//export default db_connection;


class Database {
    constructor() {
      if (!Database.instance) {
        this._url = null; // The database URL
        this._connection = null; // The database connection instance
        Database.instance = this; // Store the single instance
      }
  
      return Database.instance;
    }
  
    // Set the database URL
    setUrl(url) {
      this._url = url;
    }
  
    // Connect to the database
    connect() {
      if (!this._connection) {
        mongoose.connect(this._url, { useNewUrlParser: true, useUnifiedTopology: true })
          .then(() => {
            console.log('DB connected');
          })
          .catch((err) => console.log('DB connection error', err));
  
        this._connection = mongoose.connection; // Store the connection instance
      }
  
      return this._connection;
    }
  }

  module.exports = {Database}