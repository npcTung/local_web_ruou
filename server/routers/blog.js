const router = require("express").Router();
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");
const blog = require("../controllers/blog");
const uploader = require("../config/cloudinary.config");

router.post(
  "/",
  [verifyAccessToken, isAdmin],
  uploader.single("image"),
  blog.createNewBlog
);
router.get("/", blog.getBlogs);
router.put("/like/:bid", [verifyAccessToken], blog.likeBlog);
router.put("/dislike/:bid", [verifyAccessToken], blog.dislikeBlog);
router.get("/:bid", blog.getBlog);
router.put(
  "/:bid",
  [verifyAccessToken, isAdmin],
  uploader.single("image"),
  blog.updateBlog
);
router.delete("/:bid", [verifyAccessToken, isAdmin], blog.deleteBlog);
router.put(
  "/upload-image/:bid",
  [verifyAccessToken, isAdmin],
  uploader.single("image"),
  blog.uploadImageBlog
);

module.exports = router;
