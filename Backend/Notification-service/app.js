const express = require("express");
const bodyParser = require("body-parser");
const orderConfirmationRoutes = require("./routes/orderConfRoutes");

const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/", orderConfirmationRoutes);
app.get("/", (req, res, next) => {
  res.json({ message: "Hi" });
});

app.listen(5011);
console.log("Backend is up");

// mongoose
//   .connect(
//     'mongodb+srv://RestAPI:RestAPI123@cluster0.xq2zop1.mongodb.net/miracleworkers?retryWrites=true&w=majority'
//   )
//   .then(() => {
//   })
//   .catch((err) => {
//     console.log(err);
//   });