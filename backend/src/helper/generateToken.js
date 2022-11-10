const jwt = require("jsonwebtoken");
const {config} = require ("dotenv");
config();

const tokenSign = async (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "24h",
    }
  );
};

const verifyToken = async (token) => {
  try {
    if ( jwt.verify(token, process.env.JWT_SECRET)) {
      return jwt.verify(token, process.env.JWT_SECRET);
    }
    else{
      console.log("mallll");
      return true;
    }
  } catch (error) {
    return null;
  }
};
module.exports = {tokenSign,verifyToken}