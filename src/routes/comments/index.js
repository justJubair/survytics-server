const express = require("express");
const getComments = require("../../api/comments/getComments");
const postComment = require("../../api/comments/postComment");
const router = express.Router();

// GET; comments with survey id query
router.get("/comments", getComments);

// POST; a comment
router.post("/comments", postComment);

module.exports = router;
