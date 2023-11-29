const Comments = require("../../models/Comments")
const getComments = async (req, res) => {
    let query = {};
    if (req?.query.surveyId) {
      query = { surveyId: req?.query.surveyId };
    }
    console.log(query)
    const result = await Comments.find(query);
    res.send(result);
  }

  module.exports=getComments