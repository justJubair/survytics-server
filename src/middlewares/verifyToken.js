require("dotenv").config();
const jwt = require("jsonwebtoken");
    // jwt middlewares
const verifyToken = (req, res, next) => {
    const token = req?.cookies?.token;
    if (!token) {
      return res.status(401).send({ message: "unauthorized" });
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
      // error
      if (error) {
        return res.status(401).send({ message: "unauthorized" });
      }
      // if token is valid then only it would be decoded
  
      req.decoded = decoded;
      
      next();
    });
  };
  


module.exports= verifyToken