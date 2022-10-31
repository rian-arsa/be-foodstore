const express = require("express");
const { store, update, destroy } = require("./controller");
const multer = require("multer");
const { verifyUser } = require("../auth/middleware");

const router = express.Router();

router.post("/tags", verifyUser, multer().none(), store);
router.put("/tags/:id", verifyUser, multer().none(), update);
router.delete("/tags/:id", verifyUser, destroy);

module.exports = router;
