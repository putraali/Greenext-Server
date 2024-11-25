const express = require("express");
const router = express.Router();

const {
  getCourse,
  addCourse,
  updateCourse,
  getCourseById,
  deleteCourse,
  getCourses,
} = require("../controllers/course");

router.get("/", getCourses);
router.post("/", addCourse);
router.put("/:id", updateCourse);
router.get("/:id", getCourseById);
router.delete("/:id", deleteCourse);

module.exports = router;
