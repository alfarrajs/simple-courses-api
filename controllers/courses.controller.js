let { courses } = require("../data/courses");
const { validationResult, body } = require("express-validator");

// G E T A L L  C O U R S E S  R E Q U E S T

const getAllCourses = (req, res) => {
  res.send(courses);
};

//  G E T  S I N G L E  C O U R S E R E Q U E S T
const getCourse = (req, res) => {
  let wantedCourse = courses.find(
    (courses) => courses.id === parseInt(req.params.id)
  );
  if (!wantedCourse)
    res.status(404).send("The course with the given ID was not found.");
  res.send(wantedCourse);
  // some,every return boolean
  //find return object , if not found return undefined
  //filter return array , if not found return empty array

  // different between res.send and res.write
  // res.send() has by default res.end() in it , so you can't use res.write() after res.send()
};

//    P O S T  R E Q U E S T

const createCourse = () => {
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
    (req, res) => {
      const errors = validationResult(req);
      // ?I use validationResult to check if there is an error in the request body

      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json(errors.formatWith(({ msg }) => msg).mapped());
      }

      // ?I use return to stop the function from running
      // ?I use formatWith to get the error message only

      courses.push({ id: courses.length + 1, ...req.body });
      res.status(201).json(courses);
    };
};

// P A T C H  R E Q U E S T

const updateCourse = (req, res) => {
  let wantedCourse = courses.find(
    (courses) => courses.id === parseInt(req.params.id)
  ); // return me an object
  if (!wantedCourse) res.status(404).send({ msg: "course not found" });

  wantedCourse = { ...wantedCourse, ...req.body };
  // !objects mearged by reference the new propersties will override the old ones
  res.send(wantedCourse);
};

// D E L E T E  R E Q U E S T

const deleteCourse = (req, res) => {
  let wantedCourse = courses.find(
    (courses) => courses.id === parseInt(req.params.id)
  );
  if (!wantedCourse) res.status(404).send({ msg: "course not found" });

  const index = courses.indexOf(wantedCourse);
  courses.splice(index, 1);
  res.send(courses);
};



module.exports = {  
  getAllCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
};
