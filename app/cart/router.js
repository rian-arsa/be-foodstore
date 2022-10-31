const router = require("express").Router();
const multer = require("multer");
const { verifyUser } = require("../auth/middleware");
const { update, index } = require("./controller");

router.put("/carts", verifyUser, multer().none(), update);
router.get("/carts", verifyUser, index);

module.exports = router;
