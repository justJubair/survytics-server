const Reports =require("../../models/Reports")
const postUserReport = async (req, res) => {
    const report = req?.body;
    const result = await Reports.create(report);
    res.send(result);
  }

  module.exports=postUserReport