require("dotenv").config();
const express = require("express");
const router = express.Router();
const Stripe = require("stripe");
const createIntent = require("../../api/stripe/createIntent");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/create-payment-intent", createIntent);

module.exports = router;
