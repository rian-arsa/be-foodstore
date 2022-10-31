const router = require("express").Router();
const multer = require("multer");

const { verifyUser } = require("../auth/middleware");
const { store, update, destroy, index } = require("./controller");

router.get("/delivery-addresses", verifyUser, multer().none(), index);
router.post("/delivery-addresses", verifyUser, multer().none(), store);
router.put("/delivery-addresses/:id", multer().none(), update);
router.delete("/delivery-addresses/:id", multer().none(), destroy);

module.exports = router;
