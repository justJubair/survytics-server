const express = require("express");
const getUserRole = require("../../api/users/getUserRole");
const getAllUser = require("../../api/users/getAllUser");
const verifyToken = require("../../middlewares/verifyToken");
const router = express.Router();

router.get("/role", getUserRole);

// GET; all the users for admin
router.get("/users",verifyToken, getAllUser);

module.exports = router;
