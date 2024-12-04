const express = require("express");
const router = express.Router();

const { registerUser, loginUser } = require("../controllers/authController");

router.post("/register", registerUser); // http://localhost:5000/api/v1/auth/register POST
router.post("/login", loginUser); // http://localhost:5000/api/v1/auth/login POST

module.exports = router;
