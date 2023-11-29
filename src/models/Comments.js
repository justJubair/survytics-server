const mongoose = require("mongoose");
const { Schema } = mongoose;

const CommentSchema = new Schema({
    userName: String,
    userPhoto: String,
    userEmail: String,
    surveyId: String,
    surveyTitle: String,
    commentText: String,
});

const Comments = mongoose.model("Comments", CommentSchema);

module.exports = Comments;
