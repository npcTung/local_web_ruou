const router = require("express").Router();
const insert = require("../controllers/insertData");

router.post("/category", insert.insertCategory);
router.post("/product", insert.insertProduct);

module.exports = router;
