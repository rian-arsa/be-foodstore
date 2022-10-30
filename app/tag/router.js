const express = require("express");
const { store, update, destroy } = require("./controller");
const multer = require("multer");

const router = express.Router();

router.post("/tags", multer().none(), store);
router.put("/tags/:id", multer().none(), update);
router.delete("/tags/:id", destroy);

module.exports = router;
