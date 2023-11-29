const Surveys = require("../../models/Surveys")
const publishSurvey = async(req,res)=>{
    const id = req?.params.id;
    const filter = {_id: id}
    const updatedDoc= {
        $set: {
            status: "published"
        }
    }
    const result = await Surveys.updateOne(filter, updatedDoc)
    res.send(result)
}

module.exports=publishSurvey