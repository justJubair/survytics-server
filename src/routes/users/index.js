const express = require("express");
const getUserRole = require("../../api/users/getUserRole");
const getAllUser = require("../../api/users/getAllUser");
const verifyToken = require("../../middlewares/verifyToken");
const postUser = require("../../api/users/postUser");
const updateRole = require("../../api/users/updateRole");
const verifyAdmin = require("../../middlewares/verifyAdmin");
const router = express.Router();

router.get("/role", getUserRole);

// GET; all the users for admin
router.get("/users", verifyToken, verifyAdmin, getAllUser);

// POST; a user
router.post("/users", postUser);

 // PATCH; update a users role via admin
router.patch("/user/:id", updateRole);

module.exports = router;
