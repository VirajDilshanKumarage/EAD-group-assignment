// database (Singleton)
const mongoose = require("mongoose");
require('dotenv').config();

class Database {
  constructor() {
    this.DB_URL = process.env.DB_URL;
  }

  connect() {
    if (!this.connection) {
      this.connection = mongoose.connect(this.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      mongoose.connection.on('connected', () => {
        console.log("Connected to MongoDB");
      });
      mongoose.connection.on('error', (err) => {
        console.log('DB connection error', err);
      });
    }
    return this.connection;
  }
}

module.exports = new Database();
