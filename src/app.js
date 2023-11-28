require("dotenv").config();
const express = require("express");
const applyMiddleware = require("./middlewares/applyMiddleware");
const app = express();
const port = process.env.PORT || 5000;

applyMiddleware(app)

app.get("/health", (req, res) => {
    res.send("Survytics is running mongoose");
  });

  app.all("*", (req,res,next)=>{
    const error = new Error(`The requested url is invalid: [${req?.url}]`)
    error.status=404
    next(error)
  })

  app.use((err,req,res,next)=>{
    res.status(err.status || 500).json({
        message:err.message
    })
  })
  
  app.listen(port, () => {
    console.log(`Server is running on ${port}`);
  });
  