const express = require("express");
const app = express();

const {getAllCourses, getCourse, createCourse, updateCourse, deleteCourse} = require("./controllers/courses.controller.js");


app.get("/api/courses", getAllCourses);

app.get("/api/courses/:id",getCourse );


// Parse JSON request bodies
app.use(express.json());
app.post("/api/courses" , createCourse );
 
  


app.patch("/api/courses/:id", updateCourse );

app.delete("/api/courses/:id", deleteCourse);



app.listen(1900, () => {
  console.log("Server running on port 1900");
});

