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
    required: true,
  },
  dislike: {
    type: Number,
    required: true,
  },
  VoteYes: {
    type: Number,
    required: true,
  },
  VoteNO: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  totalVote: {
    type: Number,
    required: true,
  },
});

const Surveys = mongoose.model("Surveys", SurveySchema);

module.exports = Surveys;
