// (1) import `router` dan `multer`
const router = require("express").Router();
const multer = require("multer");
const { verifyUser } = require("../auth/middleware");

const { store, index } = require("./controller");

router.post("/orders", verifyUser, multer().none(), store);
router.get("/orders", verifyUser, index);

module.exports = router;
