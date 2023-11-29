const express = require("express");
const getSurveys = require("../../api/surveys/getSurveys");
const getSingleSurvey = require("../../api/surveys/getSingleSurvey");
const postSurvey = require("../../api/surveys/postSurvey");
const updateSurvey = require("../../api/surveys/updateSurvey");
const updateSurveyStatus = require("../../api/surveys/updateSurveyStatus");
const updateVote = require("../../api/surveys/updateVote");


const router = express.Router()

router.get("/surveys", getSurveys);

router.get("/survey/:id", getSingleSurvey);

router.post("/surveys", postSurvey);

router.put("/survey/:id", updateSurvey);

router.put("/surveyUnpublish/:id", updateSurveyStatus)

  // PATCH; increase voteYes and voteNo by one
router.patch("/survey/:id", updateVote);


module.exports =router