const router = require("express").Router();
const category = require("../controllers/category");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

router.post("/", [verifyAccessToken, isAdmin], category.createCategory);
router.get("/", category.getCategories);
router.put("/:pcid", [verifyAccessToken, isAdmin], category.updateCategory);
router.delete("/:pcid", [verifyAccessToken, isAdmin], category.deleteCategory);

module.exports = router;
