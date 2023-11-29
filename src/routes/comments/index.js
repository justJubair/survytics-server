const express = require("express");
const getComments = require("../../api/comments/getComments");
const router = express.Router();

// GET; comments with survey id query
router.get("/comments", getComments);


module.exports=router