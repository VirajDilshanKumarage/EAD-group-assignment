// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const database = require('./database'); // Singleton

app.use(bodyParser.json());
app.use(cors());

const cartRoutes = require('./routes/cartRoutes');

// import routes
app.use('/cart', cartRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

// Use the Singleton instance to connect to the database
database.connect();
