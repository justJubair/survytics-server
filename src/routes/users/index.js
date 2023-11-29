const express = require("express");
const getUserRole = require("../../api/users/getUserRole");
const router = express.Router()

router.get("/role", getUserRole);



  module.exports = router