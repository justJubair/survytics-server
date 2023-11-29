const mongoose = require("mongoose");
const { Schema } = mongoose;

const SurveySchema = new Schema({
  title: {
    type: String,
   
  },
  question: {
    type: String,
    
  },
  description: {
    type: String,
    
  },
  category: {
    type: String,
    
  },
  deadline: {
    type: String,
    
  },
  like: {
    type: Number,
  },
  dislike: {
    type: Number,
  },
  VoteYes: {
    type: Number,
  },
  VoteNo: {
    type: Number,
  },
  status: {
    type: String,
  },
  totalVote: Number,
  Timestamp: String
});

const Surveys = mongoose.model("Surveys", SurveySchema);

module.exports = Surveys;
