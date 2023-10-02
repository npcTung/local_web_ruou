const router = require("express").Router();
const product = require("../controllers/product");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");
const uploader = require("../config/cloudinary.config");

router.post(
  "/",
  [verifyAccessToken, isAdmin],
  uploader.fields([
    { name: "images", maxCount: 30 },
    { name: "thumb", maxCount: 1 },
  ]),
  product.createProduct
);
router.get("/", product.getProducts);
router.put("/ratings", [verifyAccessToken], product.ratings);

router.put(
  "/upload-image/:pid",
  [verifyAccessToken, isAdmin],
  uploader.array("images", 30),
  product.uploadImageProduct
);
router.get("/:pid", product.getProduct);
router.put(
  "/varriant/:pid",
  [verifyAccessToken, isAdmin],
  uploader.fields([
    { name: "images", maxCount: 30 },
    { name: "thumb", maxCount: 1 },
  ]),
  product.addVarriant
);
router.put(
  "/:pid",
  [verifyAccessToken, isAdmin],
  uploader.fields([
    { name: "images", maxCount: 30 },
    { name: "thumb", maxCount: 1 },
  ]),
  product.updateProduct
);
router.delete("/:pid", [verifyAccessToken, isAdmin], product.deleteProduct);

module.exports = router;
