const router = require("express").Router();
const Users = require("../controllers/user");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");
const uploader = require("../config/cloudinary.config");

router.post("/login", Users.login);
router.post("/register", Users.register);
router.post("/mock", Users.createUsers);
router.get("/current", [verifyAccessToken], Users.getCurrent);
router.get("/refresh-token", Users.refreshAccessToken);
router.get("/logout", Users.logout);
router.post("/forgot-password", Users.forgotPassword);
router.put("/reset-password", Users.resetPassword);
router.get("/", [verifyAccessToken, isAdmin], Users.getUsers);
router.put(
  "/current",
  [verifyAccessToken],
  uploader.single("avatar"),
  Users.updateUser
);
router.put("/address", [verifyAccessToken], Users.updateUserAddress);
router.put("/wishlist/:pid", [verifyAccessToken], Users.updateWishList);
router.delete("/:uid", [verifyAccessToken, isAdmin], Users.deleteUser);
router.delete(
  "/remove-wishlist/:pid",
  [verifyAccessToken],
  Users.removeWishListInUser
);
router.put("/final-register/:token", Users.finalregister);
router.put("/:uid", [verifyAccessToken, isAdmin], Users.updateUserByAdmin);

module.exports = router;
