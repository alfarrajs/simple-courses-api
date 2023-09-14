const mongoose = require("mongoose");

const courceSchema = new mongoose.Schema({
  title: { type: String, required: true},
  price: { type: Number, required: true},
});

module.exports = mongoose.model("Course", courceSchema); // Courses is the name of the collection in the database
