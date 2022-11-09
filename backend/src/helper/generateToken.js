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
      expiresIn: "2h",
    }
  );
};

const verifyToken = async (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};
module.exports = {tokenSign,verifyToken}