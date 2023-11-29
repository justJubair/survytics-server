const express = require("express");
const getSurveys = require("../../api/surveys/getSurveys");
const getSingleSurvey = require("../../api/surveys/getSingleSurvey");
const postSurvey = require("../../api/surveys/postSurvey");
const updateSurvey = require("../../api/surveys/updateSurvey");
const updateSurveyStatus = require("../../api/surveys/updateSurveyStatus");
const updateVote = require("../../api/surveys/updateVote");
const getAllVotes = require("../../api/surveys/getAllVotes");
const updateLikeDislike = require("../../api/surveys/updateLikeDislike");
const publishSurvey = require("../../api/surveys/publishSurvey");
const getSurveyDashboard = require("../../api/surveys/getSurveyDashboard");

const router = express.Router();

router.get("/surveys", getSurveys);

router.get("/survey/:id", getSingleSurvey);

router.post("/surveys", postSurvey);

// GET; a single survey in the dashboard route
router.get("/dashboard/updateSurvey/:id", getSurveyDashboard)

router.put("/updateSurvey/:id", updateSurvey);

router.put("/surveyUnpublish/:id", updateSurveyStatus);

router.get("/votes", getAllVotes);

// PATCH; increase voteYes and voteNo by one
router.patch("/survey/:id", updateVote);

// PATCH; increase likes and dislikes
router.patch("/surveyLikesAndDislikes/:id", updateLikeDislike);

// PATCH; change survey status to publish
router.patch("/surveyPublish/:id", publishSurvey)

module.exports = router;
