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
const voteRoutes = require("./routes/votes/index")
const commentRoutes=require("./routes/comments/index")
const paymentRoutes=require("./routes/payments/index")
const stripeRoutes=require("./routes/stripe/index")

applyMiddleware(app)
app.use(authenticationRoutes)
app.use(surveyRoutes)
app.use(userRoutes)
app.use(reportRoutes)
app.use(voteRoutes)
app.use(commentRoutes)
app.use(paymentRoutes)
app.use(stripeRoutes)




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
  
  // const main= async()=>{
  //   await connectDB();
    
  //   app.listen(port, () => {
  //     console.log(`Server is running on ${port}`);
  //   });
  // }
module.exports=app
  // main()
  