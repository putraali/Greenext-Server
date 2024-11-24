const express = require("express");
const router = express.Router();

const { getCourse } = require("../controllers/course");

router.get("/", getCourse);

module.exports = router;
