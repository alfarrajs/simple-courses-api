const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: [3, "Name must be at least 3 characters long"],
    maxlength: [50, "Name must be at most 50 characters long"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    minlength: [3, "Email must be at least 3 characters long"],
    maxlength: [50, "Email must be at most 50 characters long"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [3, "Password must be at least 3 characters long"],
    maxlength: [50, "Password must be at most 50 characters long"],
  },
  role: {
    type: String,
    required: [true, "Role is required"],
    enum: ["admin", "user"],
    default: "user",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema) // User is the name of the collection in the database
