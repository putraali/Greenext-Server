const express = require("express");
const router = express.Router();

const {
  getCourses,
  addCourse,
  updateCourse,
  getCourseById,
  deleteCourse,
  searchCourse,
} = require("../controllers/courseController");

router.get("/", searchCourse);
router.get("/", getCourses);
router.post("/", addCourse);
router.put("/:id", updateCourse);
router.get("/:id", getCourseById);
router.delete("/:id", deleteCourse);

module.exports = router;
