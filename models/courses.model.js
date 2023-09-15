const mongoose = require("mongoose");

const courceSchema = new mongoose.Schema({
  title: { type: String},
  price: { type: Number},
});

module.exports = mongoose.model("Courses", courceSchema); // Courses is the name of the collection in the database
