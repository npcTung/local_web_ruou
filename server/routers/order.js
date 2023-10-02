const router = require("express").Router();
const Order = require("../controllers/order");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

router.get("/", [verifyAccessToken], Order.getUserOrder);
router.get("/admin", [verifyAccessToken, isAdmin], Order.getOrders);
router.post("/", [verifyAccessToken], Order.createOrder);
router.put("/status/:oid", [verifyAccessToken, isAdmin], Order.updateStatus);

module.exports = router;
