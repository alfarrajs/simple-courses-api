const express = require("express");
const app = express();
const mongoose = require("mongoose");
const uri = "mongodb+srv://alfarra:$3AZF$004@learn-mongo-db.cknzxfd.mongodb.net/Welcome";


mongoose.connect(uri)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.log("Error: ", err.message));


app.use(express.json());

let coursesRotuer = require("./routes/courses.route.js");
app.use("/api/courses", coursesRotuer); 

app.listen(1900, () => {
  console.log("Server running on port 1900");
});
