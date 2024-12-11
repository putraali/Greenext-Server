const express = require("express");
const router = express.Router();

const { getUsers } = require("../controllers/userController");

router.get("/", getUsers); //http://localhost:5000/api/v1/user

module.exports = router;
