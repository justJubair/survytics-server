const Surveys = require("../../models/Surveys")
const getAllVotes = async (req, res) => {
    const result = await Surveys.aggregate([
        {
          $addFields: {
            surveyIdAsString: { $toString: "$_id" },
          },
        },
        {
          $lookup: {
            from: "votes",
            localField: "surveyIdAsString",
            foreignField: "surveyId",
            as: "participants",
          },
        },
      ]);
    res.send(result);
  }

  module.exports=getAllVotes