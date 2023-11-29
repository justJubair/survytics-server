const Surveys = require("../../models/Surveys")
const updateVote = async (req, res) => {
    const id = req?.params.id;
    const { increase, operation } = req?.body;
    // const query = { _id: new ObjectId(id) };
    const filter = {_id: id}
    const survey = await Surveys.findById(id).exec()
    


    let updatedDoc = {};
    if (operation === "yes") {
     

        updatedDoc = {
          $set: {
            VoteYes: survey?.VoteYes + increase,
            totalVote: survey?.totalVote + increase,
          },
        };
     
    } else {
     

        updatedDoc = {
          $set: {
            VoteNo: survey?.VoteNo + increase,
            totalVote: survey?.totalVote + increase,
          },
        };
    
    }

    const result = await Surveys.updateOne(filter, updatedDoc);
    console.log(result)
    res.send(result);
  }

  module.exports = updateVote