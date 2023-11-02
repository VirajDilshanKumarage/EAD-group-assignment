const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config();
const app = express();

const cartRoutes = require('./routes/cartRoutes');

app.use(bodyParser.json());
app.use(cors());

// import routes
app.use('/cart', cartRoutes);

const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connect(DB_URL)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log('DB connection error', err); 
    });

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
