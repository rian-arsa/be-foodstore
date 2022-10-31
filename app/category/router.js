const express = require("express");
const multer = require("multer");
const { verifyUser } = require("../auth/middleware");
const { store, update, destroy } = require("./controller");

const router = express.Router();

router.post("/categories", verifyUser, multer().none(), store);
router.put("/categories/:id", verifyUser, multer().none(), update);
router.delete("/categories/:id", verifyUser, destroy);

module.exports = router;
