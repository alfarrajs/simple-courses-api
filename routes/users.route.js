const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users.controller.js");


router
  .route("/")
  .get(usersController.getAllUsers)
  .post(usersController.loginUser);

module.exports = router;
