const express = require("express");
const postVote = require("../../api/votes/postVote");
const getIsVoted = require("../../api/votes/getIsVoted");
const router = express.Router();

// POST; voting details with user information
router.post("/votes", postVote);

// Check if the user is voted or not
router.get("/isVoted", getIsVoted);

module.exports = router;
