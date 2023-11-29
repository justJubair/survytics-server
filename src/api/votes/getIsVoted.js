const Votes = require("../../models/Votes");
const getIsVoted = async (req, res) => {
  const { surveyId, userEmail } = req?.query;
  const query = { surveyId: surveyId };

  const surveys = await Votes.find(query);
  const isVoted = surveys.find((survey) => survey?.userEmail === userEmail);

  if (isVoted) {
    return res.send(true);
  } else {
    return res.send(false);
  }
};

module.exports = getIsVoted;
