const express = require("express");
const { store, index, update, destroy } = require("./controller");
const multer = require("multer");
const os = require("os");
const { verifyUser } = require("../auth/middleware");

const router = express.Router();

router.get("/products", verifyUser, index);
router.post(
  "/products",
  verifyUser,
  multer({ dest: os.tmpdir() }).single("image"),
  store
);
router.put(
  "/products/:id",
  verifyUser,
  multer({ dest: os.tmpdir() }).single("image"),
  update
);
router.delete("/products/:id", verifyUser, destroy);

module.exports = router;
