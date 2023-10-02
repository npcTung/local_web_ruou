const router = require("express").Router();
const brand = require("../controllers/brand");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

router.post("/", [verifyAccessToken, isAdmin], brand.createNewBrand);
router.get("/", brand.getBrands);
router.put("/:bid", [verifyAccessToken, isAdmin], brand.updateBrand);
router.delete("/:bid", [verifyAccessToken, isAdmin], brand.deleteBrand);

module.exports = router;
