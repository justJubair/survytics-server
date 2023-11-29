const Reports =require("../../models/Reports")
const postReportAdmin = async(req,res)=>{
    const adminMessage = req?.body;
   
   
    const adminMessageResult = await Reports.create(adminMessage)
   
    res.send(adminMessageResult)

  }

  module.exports = postReportAdmin