const express = require("express");
const postReportAdmin = require("../../api/reports/postReportAdmin");
const getReport = require("../../api/reports/getReport");
const postUserReport = require("../../api/reports/postUserReport");
const router = express.Router();

router.post("/reportAdmin", postReportAdmin);

// Get; reports by survey ids
router.get("/reports", getReport);

// POST; a report by user
router.post("/reports", postUserReport);

module.exports = router;
