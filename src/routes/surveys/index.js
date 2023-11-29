const express = require("express");
const getSurveys = require("../../api/surveys/getSurveys");
const getSingleSurvey = require("../../api/surveys/getSingleSurvey");
const router = express.Router()

router.get("/surveys", getSurveys);

router.get("/survey/:id", getSingleSurvey);

module.exports =router