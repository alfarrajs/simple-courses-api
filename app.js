const express = require("express");
const app = express();
const { body } = require("express-validator");

const {
  getAllCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
  
} = require("./controllers/courses.controller.js");

app.get("/api/courses", getAllCourses);

app.get("/api/courses/:id", getCourse);

// Parse JSON request bodies
app.use(express.json());
app.post(
  "/api/courses",
  [
    body("name")
      .notEmpty()
      .withMessage("title/name of book is required")
      .isString()
      .withMessage("title/name of book must be a string"),
    body("price")
      .notEmpty()
      .withMessage("price is required")
      .isNumeric()
      .withMessage("price must be a number")
      .isInt({ min: 0 })
      .withMessage("price must be a positive number"),
  ],
  createCourse
);

app.patch(
  "/api/courses/:id",
  [
    body("name")
      .notEmpty()
      .withMessage("title/name of book is required")
      .isString()
      .withMessage("title/name of book must be a string"),
    body("price")
      .notEmpty()
      .withMessage("price is required")
      .isNumeric()
      .withMessage("price must be a number")
      .isInt({ min: 0 })
      .withMessage("price must be a positive number"),
  ],
  updateCourse
);

app.delete("/api/courses/:id", deleteCourse);

app.listen(1900, () => {
  console.log("Server running on port 1900");
});
