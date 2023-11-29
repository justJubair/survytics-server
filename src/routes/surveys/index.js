const express = require("express");
const getSurveys = require("../../api/surveys/getSurveys");
const getSingleSurvey = require("../../api/surveys/getSingleSurvey");
const postSurvey = require("../../api/surveys/postSurvey");
const router = express.Router()

router.get("/surveys", getSurveys);

router.get("/survey/:id", getSingleSurvey);

router.post("/surveys", postSurvey);

module.exports =router