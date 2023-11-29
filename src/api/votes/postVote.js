const Votes =require("../../models/Votes")
const moment = require("moment/moment");
const postVote = async (req, res) => {
    const { votingDetails } = req?.body;
    votingDetails.time = moment().format("MMM Do YYYY, h:mm a");
    const result = await Votes.create(votingDetails);
    res.send(result);
  }

  module.exports=postVote