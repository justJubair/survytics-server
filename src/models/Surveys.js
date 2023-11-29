const mongoose = require("mongoose");
const { Schema } = mongoose;

const SurveySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  deadline: {
    type: String,
    required: true,
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
