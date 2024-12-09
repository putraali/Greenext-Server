const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  authenticateToken,
} = require("../controllers/authController");

router.post("/register", registerUser); // http://localhost:5000/api/v1/auth/register POST
router.post("/login", loginUser); // http://localhost:5000/api/v1/auth/login POST
// http://localhost:5000/api/v1/auth/me
router.get("/me", authenticateToken, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Successfully get logged in user",
    user: req.user,
  });
});

module.exports = router;
