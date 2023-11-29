const mongoose = require('mongoose');
const Surveys = require("../../models/Surveys")

const getSingleSurvey = async (req, res) => {
  const id = req.params.id;
  const result = await Surveys.findById(id).exec()
  res.send(result);
}

module.exports = getSingleSurvey