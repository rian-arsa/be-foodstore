const router = require("express").Router();

const {
  getProvinsi,
  getKabupaten,
  getKecamatan,
  getDesa,
} = require("./controller");

router.get("/wilayah/provinsi", getProvinsi);
router.get("/wilayah/kabupaten", getKabupaten);
router.get("/wilayah/kecamatan", getKecamatan);
router.get("/wilayah/desa", getDesa);

module.exports = router;
