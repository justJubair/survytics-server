require("dotenv").config();
const express = require("express");
const applyMiddleware = require("./middlewares/applyMiddleware");
const connectDB = require("./db/connectDB");
const app = express();
const port = process.env.PORT || 5000;

const authenticationRoutes = require("./routes/authentication/index")
const surveyRoutes = require("./routes/surveys/index")
const userRoutes = require("./routes/users/index")
const reportRoutes = require("./routes/reports/index")

applyMiddleware(app)
app.use(authenticationRoutes)
app.use(surveyRoutes)
app.use(userRoutes)
app.use(reportRoutes)




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
  
  const main= async()=>{
    await connectDB();
    
    app.listen(port, () => {
      console.log(`Server is running on ${port}`);
    });
  }

  main()
  