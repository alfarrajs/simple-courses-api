const express = require("express");
const router = express.Router();

const {
  getAllCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courses.controller.js");


const {validationSchema} = require("../middlewares/validationsScheme.js");

router
.route("/")
  .get(getAllCourses)
  .post(validationSchema,createCourse)
    

router
.route("/:id")
  .get(getCourse)
  .patch(
    validationSchema,
    updateCourse
  )
  .delete(deleteCourse);

module.exports = router;
