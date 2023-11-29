const moment = require("moment");
const Surveys = require("../../models/Surveys")
const postSurvey = async (req, res) => {
    const survey = req?.body;
    
    survey.Timestamp = moment().format("MMM Do YYYY, h:mm a");
    
    const result = await Surveys.create(survey);
    res.send(result)
}

module.exports = postSurvey