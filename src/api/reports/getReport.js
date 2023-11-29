const Reports =require("../../models/Reports")
const getReport = async (req, res) => {
    const surveyId = req?.query?.surveyId;
    const query = { surveyId: surveyId };
    const result = await Reports.find(query);
    res.send(result);
  }

  module.exports=getReport