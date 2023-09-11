const express = require("express");
const app = express();
const { body, validationResult } = require("express-validator");
// CRUD (Create, Read, Update, Delete) - RESTful API (Representational State Transfer)
// HTTP methodes : GET, POST, PUT, DELETE
const courses = [
  { id: 1, name: "react", price: 1000 },
  { id: 2, name: "html", price: 2000 },
  { id: 3, name: "css", price: 3000 },
];

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
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
});

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
  (req, res) => {
    const errors = validationResult(req);
    // ?I use validationResult to check if there is an error in the request body

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.formatWith(({ msg }) => msg).mapped());
    }

    // ?I use return to stop the function from running
    // ?I use formatWith to get the error message only

    courses.push({ id: courses.length + 1, ...req.body });
    res.status(201).json(courses);
  }
);
// end the post request

//patch vs put : patch is used to update one property , put is used to update all the properties
app.patch("/api/courses/:id", (req, res) => {
  let wantedCourse = courses.find(
    (courses) => courses.id === parseInt(req.params.id)
  ); // return me an object
  if (!wantedCourse) res.status(404).send({ msg: "course not found" });
   
  wantedCourse = {...wantedCourse, ...req.body };
  // !objects mearged by reference the new propersties will override the old ones
  res.send(wantedCourse);
});
// end the put request

app.delete("/api/courses/:id", (req, res) => {
  let wantedCourse = courses.find(
    (courses) => courses.id === parseInt(req.params.id)
  );
  if (!wantedCourse)
    res.status(404).send("The course with the given ID was not found.");
  let index = courses.indexOf(wantedCourse);
  courses.splice(index, 1);
  res.send(wantedCourse);
});
// end the delete request

app.listen(1900, () => {
  console.log("Server running on port 1900");
});

// experss has by default a body parser , so you don't need to install it
// body parser is a middleware that parse the body of the request
// when you send a request to the server , the request has a body , the body is the data that you send to the server , which is in object form , but the server can't read it , so the body parser parse it to be readable by the server
