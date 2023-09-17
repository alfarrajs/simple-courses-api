const express = require("express");
const router = express.Router();

 const CourcesController = require("../controllers/courses.controller.js");
const { validationSchema } = require("../middlewares/validationsScheme.js");

router.route("/").get(CourcesController.getAllCourses).post(validationSchema, CourcesController.createCourse);

router
  .route("/:id")
  .get(CourcesController.getCourse)
  .patch(validationSchema, CourcesController.updateCourse)
  .delete(CourcesController.deleteCourse);

router.route("*").get((req, res) => {
  res.status(404).json({
    status: "fail",
    message: "Page not found",
  });
});
module.exports = router;
