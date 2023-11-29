const Surveys = require("../../models/Surveys")

const updateSurveyStatus = async(req,res)=>{
  
    const id = req?.params.id;
    const filter = {_id: id}
    
    const updatedDoc = {
      $set:{
        status: "unpublished"
      }
    }
    const statusResult = await Surveys.updateOne(filter, updatedDoc);
    
    // console.log(statusResult, adminMessage)
    res.send(statusResult)

  }

  module.exports = updateSurveyStatus