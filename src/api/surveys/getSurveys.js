const Surveys = require("../../models/Surveys");


const getSurveys = async (req, res) => {
    const filter = req.query;
    let query = {};

    if (filter.category) {
      query = {
        category: filter.category,
      };
    }
    if (filter?.search) {
      query = {
        title: { $regex: filter.search, $options: "i" },
      };
    }
    let options = {};
    if (filter?.sort) {
      options = {
        // TODO: change the like property to totalVote
        sort: {
          totalVote: filter.sort === "asc" ? 1 : -1,
        },
      };
    }
    const result = await Surveys.find(query).sort(options.sort);
    res.send(result);
  }

  module.exports = getSurveys