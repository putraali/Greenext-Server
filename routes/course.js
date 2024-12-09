const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../controllers/authController");

const {
  getOrSearchCourse,
  addCourse,
  updateCourse,
  getCourseById,
  deleteCourse,
} = require("../controllers/courseController");

// router.get("/", searchCourse); // http://localhost:5000/api/v1/course/ GET
router.get("/", getOrSearchCourse); // http://localhost:5000/api/v1/course/ GET
router.post("/", authenticateToken, addCourse); // http://localhost:5000/api/v1/course/ POST
router.put("/:id", updateCourse);
router.get("/:id", getCourseById);
router.delete("/:id", deleteCourse);

module.exports = router;
