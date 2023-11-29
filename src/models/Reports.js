const mongoose = require("mongoose");
const { Schema } = mongoose;

const ReportSchema = new Schema({
  surveyId: String,
  admin: String,
  message: String,
  status: String,
  surveyTitle: String,
  reportText: String,
  userName: String,
  userEmail: String,
  userPhoto: String,


});

const Reports = mongoose.model("Reports", ReportSchema);

module.exports = Reports;
