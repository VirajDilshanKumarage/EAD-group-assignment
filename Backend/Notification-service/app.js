const express = require("express");
const bodyParser = require("body-parser");
const orderConfirmationRoutes = require("./routes/orderConfRoutes");
const cors = require("cors");
const mongoose = require('mongoose');
const databaseConnection = require('./databaseConnection');


class App {
  constructor() {
    this.app = express();
    this.PORT = 5011;
    this.DB_URL = 'mongodb+srv://chandulakavishka0:ecomEAD@cluster0.bcd7kuy.mongodb.net/';
    // this.DB_URL = 'mongodb+srv://isuru_123:12345@cluster0.bcd7kuy.mongodb.net/?retryWrites=true&w=majority';

    this.setup();
    this.connectToDatabase();
    this.setupRoutes();
    this.startServer();
  }

  setup() {
    this.app.use(cors());
    this.app.use(bodyParser.json());
  }

  connectToDatabase() {
    const dbInstance = new databaseConnection.Database;
    dbInstance.setUrl(this.DB_URL);
    dbInstance.connect();
    // mongoose
    //   .connect(this.DB_URL)
    //   .then(() => {
    //     console.log('DB connected');
    //   })
    //   .catch((err) => console.log('DB connection error', err));
  }

  setupRoutes() {
    this.app.use('/', orderConfirmationRoutes);

    this.app.get('/', (req, res) => {
      res.json({ message: 'Hi' });
    });
  }

  startServer() {
    this.app.listen(this.PORT, () => {
      console.log(`App is running on ${this.PORT}`);
    });
  }
}

const app = new App();
