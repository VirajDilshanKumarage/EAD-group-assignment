const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

//import routes
const postRoutes = require('./routes/notification');

//app middleware
app.use(bodyParser.json());

app.use(postRoutes);

const PORT = 8000;
const DB_URL = 'mongodb+srv://chandulakavishka0:ecomEAD@cluster0.bcd7kuy.mongodb.net/'

mongoose.connect(DB_URL,)
.then(() =>{
    console.log('DB connected');
})
.catch((err) => console.log('DB connection error',err));

app.listen(PORT, () =>{
    console.log(`App is running on ${PORT}`);
})