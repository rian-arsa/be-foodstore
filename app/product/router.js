const express = require("express");
const { store, index, update, destroy } = require("./controller");
const multer = require("multer");
const os = require("os");

const router = express.Router();

router.get("/products", index);
router.post("/products", multer({ dest: os.tmpdir() }).single("image"), store);
router.put(
  "/products/:id",
  multer({ dest: os.tmpdir() }).single("image"),
  update
);
router.delete("/products/:id", destroy);

module.exports = router;
