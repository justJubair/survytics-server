const express = require("express");
const getPayments = require("../../api/payments/getPayments");
const verifyToken = require("../../middlewares/verifyToken");
const postPayment = require("../../api/payments/postPayment");
const verifyAdmin = require("../../middlewares/verifyAdmin");
const router = express.Router();

// GET; all the payments
router.get("/payments", verifyToken,verifyAdmin, getPayments);

// post payment details and update users role
router.put("/payments", postPayment);

module.exports = router;
