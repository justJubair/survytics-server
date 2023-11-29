const express = require("express");
const getPayments = require("../../api/payments/getPayments");
const verifyToken = require("../../middlewares/verifyToken");
const router = express.Router();

// GET; all the payments
router.get("/payments",verifyToken, getPayments);

module.exports=router
