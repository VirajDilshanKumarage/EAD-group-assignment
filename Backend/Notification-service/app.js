const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const orderConfirmationRoutes = require("./routes/orderConfRoutes");
const notificationRoute = require("./routes/notification");

const cors = require("cors");

const app = express();

const PORT = 5011;
const DB_URL = 'mongodb+srv://chandulakavishka0:ecomEAD@cluster0.bcd7kuy.mongodb.net/'
//const DB_URL = 'mongodb+srv://isuru_123:12345@cluster0.bcd7kuy.mongodb.net/?retryWrites=true&w=majority'

app.use(cors());
app.use(bodyParser.json());

app.use("/", orderConfirmationRoutes);
app.use("/",notificationRoute);
app.get("/", (req, res, next) => {
  res.json({ message: "Hi" });
});

// app.listen(PORT);
// console.log("Backend is up");


mongoose.connect(DB_URL,)
.then(() =>{
    console.log('DB connected');
})
.catch((err) => console.log('DB connection error',err));

app.listen(PORT, () =>{
    console.log(`App is running on ${PORT}`);
})