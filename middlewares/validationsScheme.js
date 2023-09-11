const { body } = require("express-validator")
const validationSchema = [
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
];

module.exports = {
    validationSchema
}