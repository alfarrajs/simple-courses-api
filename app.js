const express = require("express");
const app = express();
const mongoose = require("mongoose");
const uri = "mongodb+srv://alfarra:$3AZF$004@learn-mongo-db.cknzxfd.mongodb.net/Welcome";
const cors = require("cors");


app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
// cors is a middleware that allows us to make requests from the frontend to the backend without any issues 



mongoose.connect(uri)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.log("Error: ", err.message));


app.use(express.json());

let coursesRotuer = require("./routes/courses.route.js");
app.use("/api/courses", coursesRotuer); 

app.listen(1900, () => {
  console.log("Server running on port 1900");
});
