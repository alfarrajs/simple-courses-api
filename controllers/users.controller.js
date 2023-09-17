const users = require("../models/users.model.js");
const httpResponsesText = require("../utils/httpsResponseText.js");

const getAllUsers = async (req, res) => {
   try{
     const allUsers =  await users.find(); // ?this is promise 
     if(!allUsers) return res.status(404).json({status:httpResponsesText.fail , data : allUsers});
     res.json({status:httpResponsesText.success,data:allUsers});
   } catch(error){
     console.log(error);
   }
};



const loginUser = async (req, res) => {
 
};

module.exports = {
  getAllUsers,
  registerUser,
  loginUser,
};
