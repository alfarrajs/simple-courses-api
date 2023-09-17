const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const uri = process.env.MONGO_URL;
const httpsResponseText = require("./utils/httpsResponseText.js");
const cors = require("cors");

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
// cors is a middleware that allows us to make requests from the frontend to the backend without any issues 
// middlewars is a function that allows you to access and get the access of the request and res , and then 


mongoose.connect(uri)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.log("Error: ", err.message));


app.use(express.json());
let usersRouter = require("./routes/users.route.js");
let coursesRotuer = require("./routes/courses.route.js");
app.use("/api/courses", coursesRotuer); 
app.use("/api/users", usersRouter);
app.all("*", (req, res) => {
  res.status(404).json({
    status:httpsResponseText.error,
    message: "Page not found",
  });
});
app.listen(process.env.port || 1900, () => {
  console.log("Server running on port 1900");
});
