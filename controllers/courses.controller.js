let { validationResult } = require("express-validator");
const Course = require("../models/courses.model.js");
// G E T A L L  C O U R S E S  R E Q U E S T

const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    console.log(courses); // array of objects 
  } catch (error){
    res.status(500).json({ error: "Error retrieving courses" });
  }
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

const createCourse = (req, res) => {
  const errors = validationResult(req);
  // ?I use validationResult to check if there is an error in the request body

  if (!errors.isEmpty()) {
    return res.status(400).json(errors.formatWith(({ msg }) => msg).mapped());
  }

  // ?I use return to stop the function from running
  // ?I use formatWith to get the error message only

  courses.push({ id: courses.length + 1, ...req.body });
  res.status(201).json(courses);
};
// P A T C H  R E Q U E S T

const updateCourse = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(errors.formatWith(({ msg }) => msg).mapped());
  }
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
