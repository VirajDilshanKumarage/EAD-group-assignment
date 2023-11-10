const express = require('express');
const userModel = require('../models/user.js');

const router = express.Router();

/* GET users listing. */
router.get("/", (req, res, next) => {
  res.json({
    message: "Ahzam ",
  });
});

router.get("/create", async (req, res, next) => {
  let newUser = new userModel({
    username: "kaham",
    email: "jshagdjsh",
    password: "fsafsafds",
    role: "asdsa",
  });
  let savedUser = await newUser.save();

  res.json({ savedUser });
});

module.exports = router;
