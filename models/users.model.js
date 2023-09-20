const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    minlength: [3, "Email must be at least 3 characters long"],
    maxlength: [50, "Email must be at most 50 characters long"],
    unique: true, // Add unique: true to make the email field unique
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [3, "Password must be at least 3 characters long"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  token: {
    type: String,
  },
});
module.exports = mongoose.model("User", userSchema); // User is the name of the collection in the database
