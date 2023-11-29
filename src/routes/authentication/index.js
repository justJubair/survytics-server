const express = require("express");
const createCookieToken = require("../../api/authentication/createCookieToken");
const clearCookieToken = require("../../api/authentication/clearCookieToken");

const router = express.Router()

router.post("/jwt", createCookieToken);

router.post("/logout", clearCookieToken);
  

module.exports=router