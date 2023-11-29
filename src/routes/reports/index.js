const express = require("express");
const postReportAdmin = require("../../api/reports/postReportAdmin");
const router = express.Router()


router.post("/reportAdmin", postReportAdmin)

module.exports = router