const { compare } = require("../helper/handleBcrypt") ;
const { tokenSign } = require( "../helper/generateToken");
const User = require("../models/User") ;

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404);
      res.json({ msg: "User not found" });
      return;
    }
    if (!user.active) {
      res.status(404);
      res.json({ msg: "User not active" });
      return;
    }
    const chechPassword = await compare(password, user.password);
    const tokenSession = await tokenSign(user);
    if (!chechPassword) {
      res.status(409);
      res.json({ msg: "Invalid password" });
      return;
    }
    res.json({
      data: user,
      tokenSession,
    });
  } catch (error) {
    handleError(req, res, error);
  }
};
module.exports = {login}
