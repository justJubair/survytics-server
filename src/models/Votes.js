const mongoose = require("mongoose");
const { Schema } = mongoose;

const VoteSchema = new Schema({
    surveyId: String,
    surveyTitle: String,
    userName: String,
    userEmail: String,
    voted: String,
    time: String,

});

const Votes = mongoose.model("Votes", VoteSchema);

module.exports = Votes;
