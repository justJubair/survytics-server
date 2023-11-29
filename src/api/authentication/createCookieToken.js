require("dotenv").config();
const jwt = require("jsonwebtoken");
const createCookieToken = async (req, res) => {
    const user = req?.body;
  
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1h",
    });
  
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true, // for development
        sameSite: "none" // for development
        // secure: false,
      })
      .send({ success: true });
}

module.exports = createCookieToken