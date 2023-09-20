const users = require("../models/users.model.js");
const httpResponsesText = require("../utils/httpsResponseText.js");
const bcrypt = require("bcrypt");
const generateJWT = require("../utils/generateJWT.js");
const getAllUsers = async (req, res) => {
  try {
    const allUsers = await users.find({}, { __v: false, password: false }); // ?this is promise
    if (!allUsers)
      return res
        .status(404)
        .json({ status: httpResponsesText.fail, data: allUsers });
    res.json({ status: httpResponsesText.success, data: allUsers });
  } catch (error) {
    console.log(error);
  }
};

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const oldUser = await users.findOne({ email });
  if (oldUser) {
    return res.status(409).json({
      status: httpResponsesText.fail,
      data: "User Already Exist. Please Login",
    });
  }
  // password hashing
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new users({ name, email, password: hashedPassword });
  // generate token
  const token = await generateJWT({email:newUser.email, id:newUser._id});
  newUser.token = token;

  try {
    const savedUser = await newUser.save();
    if (!savedUser)
      return res
        .status(404)
        .json({ status: httpResponsesText.fail, data: savedUser });
    res.json({ status: httpResponsesText.success, data: savedUser });
  } catch (error) {
    console.log(error.message); // Log the error message
  }
};
//  i use return to stop the unction after the thing i want to return 
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const isUserExist = await users.findOne({ email });
  if (!isUserExist) {
    return res.status(409).json({
      status: httpResponsesText.fail,
      data: "User Does Not Exist. Please Register",
    });
  }
  const isPasswordCorrect = await bcrypt.compare(
    password,
    isUserExist.password
  );
  if (!isPasswordCorrect) {
    return res.status(409).json({
      status: httpResponsesText.fail,
      data: "Invalid Credentials",
    });
  }
  const token = await generateJWT({email:isUserExist.email, id:isUserExist._id});
  isUserExist.token = token;
  res.json({ status: httpResponsesText.success, data: isUserExist });
};

module.exports = {
  getAllUsers,
  registerUser,
  loginUser,
};
