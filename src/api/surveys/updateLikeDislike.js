const Surveys =require("../../models/Surveys")
const updateLikeDislike = async (req, res) => {
    const surveyId = req?.params.id;
    const { increase, operation } = req?.body;
    const survey = await Surveys.findOne({
      _id:surveyId,
    });
    const likes = survey.like;
    const dislikes = survey.dislike;
  
    let updatedDoc = {};
    if (operation === "like") {
      updatedDoc = {
        $set: {
          like: likes + increase,
        },
      };
    } else {
      updatedDoc = {
        $set: {
          dislike: dislikes + increase,
        },
      };
    }
    const result = await Surveys.updateOne(
      { _id:surveyId },
      updatedDoc
    );
    res.send(result);
   
  }

  module.exports=updateLikeDislike