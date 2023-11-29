const Surveys = require("../../models/Surveys")
const updateSurvey = async (req, res) => {
    const id = req?.params.id;
    const survey = req?.body;
    const filter = { _id: id };
    const updatedDoc = {
      $set: {
        title: survey?.title,
        question: survey?.question,
        category: survey?.category,
        deadline: survey?.deadline,
        description: survey?.description,
      },
    };
    const result = await Surveys.updateOne(filter, updatedDoc);
    res.send(result);
  }

  module.exports = updateSurvey