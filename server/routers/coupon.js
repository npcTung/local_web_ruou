const router = require("express").Router();
const coupon = require("../controllers/coupon");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

router.post("/", [verifyAccessToken, isAdmin], coupon.createNewCoupon);
router.get("/", coupon.getCoupons);
router.put("/:cid", [verifyAccessToken, isAdmin], coupon.updateCoupon);
router.delete("/:cid", [verifyAccessToken, isAdmin], coupon.deleteCoupon);

module.exports = router;
