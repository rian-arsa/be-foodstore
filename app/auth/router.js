const express = require("express");
const multer = require("multer");
const { register, login, me, logout } = require("./controller");
const { verifyUser } = require("./middleware");

const router = express.Router();

router.post("/register", multer().none(), register);
router.post("/login", multer().none(), login);
router.get("/me", verifyUser, me);
router.post("/logout", logout);

module.exports = router;
