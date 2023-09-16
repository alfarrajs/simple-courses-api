let { validationResult } = require("express-validator");
const Courses = require("../models/courses.model.js");
const httpResponsesText = require("../utils/httpsResponseText.js");

// how to use jsend standard for response

const getAllCourses = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * limit;
    const foundCource = await Courses.find({}, { __v: false }).limit(limit).skip(skip);
    if (!foundCource)
      return res
        .status(404)
        .json({ status: httpResponsesText.fail, data: foundCource });

    res.json({ status: httpResponsesText.success, data: foundCource }); // array of objects
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: httpResponsesText.fail, data: foundCource });
  }
};

const getCourse = async (req, res) => {
  try {
    const foundCource = await Courses.findById(req.params.id);
    if (!foundCource)
      return res.status(404).json({ status: "fail", data: foundCource });
    res.json({ status: "success", data: foundCource });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error getting course" });
  }
};

const createCourse = (req, res) => {
  // const errors = validationResult(req);

  const { title, price } = req.body;
  const newCourse = new Courses({
    title,
    price,
  });
  try {
    const savedCourse = newCourse.save();
    res.status(201).json(savedCourse);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error creating course" });
  }

  // if (!errors.isEmpty()) {
  //   return res.status(400).json(errors.formatWith(({ msg }) => msg).mapped());
  // }

  // const Course = new
  // res.status(201).json(courses);
};

const updateCourse = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(errors.formatWith(({ msg }) => msg).mapped());
  }
  let wantedCourse = courses.find(
    (courses) => courses.id === parseInt(req.params.id)
  );
  if (!wantedCourse) res.status(404).send({ msg: "course not found" });

  wantedCourse = { ...wantedCourse, ...req.body };

  res.send(wantedCourse);
};

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
