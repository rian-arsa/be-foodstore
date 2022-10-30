const express = require("express");
const multer = require("multer");
const { store, update, destroy } = require("./controller");

const router = express.Router();

router.post("/categories", multer().none(), store);
router.put("/categories/:id", multer().none(), update);
router.delete("/categories/:id", destroy);

module.exports = router;
