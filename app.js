const express = require("express");
const app = express();
app.use(express.json());

let coursesRotuer = require("./routes/courses.route.js");
app.use("/api/courses", coursesRotuer); 

app.listen(1900, () => {
  console.log("Server running on port 1900");
});
