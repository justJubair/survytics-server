const mongoose = require('mongoose');

require("dotenv").config();


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_KEY}@cluster0.hf0b3tt.mongodb.net/?retryWrites=true&w=majority`;


const connectDB = async()=>{
    console.log("Connecting to database..")
    await mongoose.connect(uri)
    console.log("Connected to database")
}

module.exports= connectDB