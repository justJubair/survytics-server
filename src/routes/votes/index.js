const express = require("express");
const getAllVotes = require("../../api/surveys/getAllVotes");

const router = express.Router()

router.get("/votes", getAllVotes);

module.exports= router
