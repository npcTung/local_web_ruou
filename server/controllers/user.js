const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../middlewares/jwt");
const jwt = require("jsonwebtoken");
const sendMail = require("../ultils/sendMail");
const crypto = require("crypto");
const maxToken = require("uniqid");
const { users } = require("../ultils/constant");
const cloudinary = require("cloudinary").v2;

const register = asyncHandler(async (req, res) => {
  const { email, password, firstName, lastName, phone } = req.body;
  if (!email || !password || !firstName || !lastName || !phone) {
    return res.status(400).json({
      success: false,
      mes: "Missing input",
    });
  }
  const user = await User.findOne({ email });
  const dt = await User.findOne({ phone });
  if (user) throw new Error("User has exised");
  else if (dt) throw new Error("Phone has exised");
  else {
    const token = maxToken();
    const emailEdited = btoa(email) + "@" + token;
    const newUser = await User.create({
      email: emailEdited,
      password,
      firstName,
      lastName,
      phone,
    });
    if (newUser) {
      const html = `
      <div>
        <img src="https://res.cloudinary.com/npctungadmin/image/upload/v1696083922/quan-ly-ruou/logo_iyi91d.png" alt='logo' />
        <p>Chào bạn</p> <br />
        <p>
          <span>bạn đang tiến hành đăng ký, mã xác nhận của bạn là: 
            <span style="color:rgb(0,0,0)">
              <strong style="color:rgb(78,164,220);font-size:15px">${token}</strong>
            </span>
          </span>
        </p>
        <p>Vui lòng hoàn thành xác nhận trong vòng 5 phút.</p>
        <p>Wine House</p>
        <h5>
          <span style="color:rgb(119,119,119);font-size:13px">Đây là thư từ hệ thống, vui lòng không trả lời thư.</span>
        </h5>
      </div>
      `;
      await sendMail({
        email,
        html,
        subject: "Hoàn tất đăng ký Wine House",
      });
    }
    setTimeout(async () => {
      await User.deleteOne({ email: emailEdited });
    }, [5 * 60 * 1000]);
    return res.status(200).json({
      success: newUser ? true : false,
      mes: newUser
        ? "Vui lòng kiểm tra Email của bạn để kích hoạt tài khoản"
        : "Phát sinh lỗi, vui lòng thử lại sau",
    });
  }
});

const finalregister = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const notActivedEmail = await User.findOne({
    email: new RegExp(`${token}$`),
  });
  if (notActivedEmail) {
    notActivedEmail.email = atob(notActivedEmail?.email?.split("@")[0]);
    notActivedEmail.save();
  }
  return res.status(200).json({
    success: notActivedEmail ? true : false,
    mes: notActivedEmail
      ? "Đăng ký thành công. Vui lòng đăng nhập"
      : "Phát sinh lỗi, vui lòng thử lại sau",
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!(email || password)) throw new Error("Missing input");
  const response = await User.findOne({ email });
  if (response && (await response.isCorrectPassword(password))) {
    const { password, role, refreshToken, ...userData } = response.toObject();
    const accessToken = generateAccessToken(response._id, role);
    const newRefreshToken = generateRefreshToken(response._id);
    await User.findByIdAndUpdate(response._id, {
      refreshToken: newRefreshToken,
      new: true,
    });
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({ success: true, accessToken, userData });
  } else throw new Error("Thông tin không hợp lệ!");
});

const getCurrent = asyncHandler(async (req, res) => {
  const { id } = req.user;
  if (!id) throw new Error("Missing input");
  const user = await User.findById({ _id: id })
    .select("-refreshToken -password")
    .populate(
      "wishlist",
      "thumb title price totalRatings ratings slug color category"
    );
  return res.status(200).json({
    success: user ? true : false,
    userData: user ? user : "User not found",
  });
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!(cookie && cookie.refreshToken))
    throw new Error("No refresh token in cookie");
  const rs = await jwt.verify(cookie.refreshToken, process.env.JWT_SECRET);
  const response = await User.findOne({
    _id: rs.id,
    refreshToken: cookie.refreshToken,
  });
  return res.status(200).json({
    success: response ? true : false,
    newAccessToken: response
      ? generateAccessToken(response._id, response.role)
      : "Refresh token not matched",
  });
});

const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!(cookie && cookie.refreshToken))
    throw new Error("No refresh is cookies");
  await User.findOneAndUpdate({
    refreshToken: cookie.refreshToken,
    refreshToken: "",
    new: true,
  });
  res.clearCookie("refreshToken", { httpOnly: true, secure: true });
  return res.status(200).json({ success: true, mes: "Logout is done" });
});

const createUsers = asyncHandler(async (req, res) => {
  const response = await User.create(users);
  return res.status(200).json({
    success: response ? true : false,
    mes: response ? "created successfully." : "created failed.",
  });
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) throw new Error("Missing email");
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");
  const resetToken = user.createPasswordChangeToken();
  await user.save();
  const html = `
    <div>
      <img src="https://res.cloudinary.com/npctungadmin/image/upload/v1696083922/quan-ly-ruou/logo_iyi91d.png" alt="logo" />
      <p>Chào bạn</p> <br />
      <p>
        Xin vui lòng click vào link dưới đây để thay đổi mật khẩu của bạn.Link này sẽ hết hạn sau 15 phút kể từ bây giờ. 
          <a href=${process.env.URL_CLIENT}/reset-password/${resetToken}>Bấn vào đây</a>
      </p>
      <p>Vui lòng hoàn thành xác nhận trong vòng 5 phút.</p>
      <p>Wine House</p>
      <h5>
        <span style="color:rgb(119,119,119);font-size:13px">Đây là thư từ hệ thống, vui lòng không trả lời thư.</span>
      </h5>
    </div>
  `;
  const data = { email, html, subject: "Forgot Password" };
  const rs = await sendMail(data);
  return res.status(200).json({
    success: rs.response?.includes("OK") ? true : false,
    mes: rs.response?.includes("OK")
      ? "hãy check mail của bạn"
      : "Đã có lỗi! Hãy thử lại sau",
  });
});

const resetPassword = asyncHandler(async (req, res) => {
  const { password, token } = req.body;
  if (!(password || token)) throw new Error("Missing inputs");
  const passwordResetToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  const user = await User.findOne({
    passwordResetToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) throw new Error("Invalid reset token");
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordChangeAt = Date.now();
  user.passwordResetExpires = undefined;
  await user.save();
  return res.status(200).json({
    success: user ? true : false,
    mes: user ? "Updated password." : "Something went wrong.",
  });
});

const getUsers = asyncHandler(async (req, res) => {
  const queries = { ...req.query };
  const excludefields = ["limit", "sort", "page", "fields"];
  excludefields.forEach((el) => delete queries[el]);
  let queryString = JSON.stringify(queries);
  queryString = queryString.replace(
    /\b(gte|gt|lt|lte)\b/g,
    (macthedEl) => `$${macthedEl}`
  );
  const formatedQueries = JSON.parse(queryString);
  if (queries?.name)
    formatedQueries.name = { $regex: queries.name, $options: "i" };
  if (req.query.q) {
    delete formatedQueries.q;
    formatedQueries["$or"] = [
      { firstName: { $regex: req.query.q, $options: "i" } },
      { lastName: { $regex: req.query.q, $options: "i" } },
      { email: { $regex: req.query.q, $options: "i" } },
    ];
  }

  let queryCommand = User.find(formatedQueries).select(
    "-refreshToken -password"
  );
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    queryCommand = queryCommand.sort(sortBy);
  }
  if (req.query.fields) {
    const fields = req.query.fields.split(",").join(" ");
    queryCommand = queryCommand.select(fields);
  }
  const page = +req.query.page || 1;
  const limit = +req.query.limit || process.env.LIMIT_PRODUCT;
  const skip = (page - 1) * limit;
  queryCommand = queryCommand.skip(skip).limit(limit);
  try {
    const response = await queryCommand.exec();
    const counts = await User.find(formatedQueries).countDocuments();
    return res.status(200).json({
      success: response ? true : false,
      counts,
      usersData: response ? response : "cannot get users",
    });
  } catch (err) {
    throw new Error(err.message);
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  const { uid } = req.params;
  if (!uid) throw new Error("Missing input");
  const response = await User.findByIdAndDelete({ _id: uid });
  if (response && response.avatar)
    cloudinary.uploader.destroy(response.fileNameAvatar);
  return res.status(200).json({
    success: response ? true : false,
    mes: response ? `User with email delete.` : "No user delete",
  });
});

const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const { firstName, lastName, email, phone } = req.body;
  const data = { firstName, lastName, email, phone };
  if (req.file) {
    data.avatar = req.file.path;
    data.fileNameAvatar = req.file.filename;
  }
  if (!(id && firstName && lastName && email && phone)) {
    cloudinary.uploader.destroy(req.file.filename);
    throw new Error("missing input");
  }
  const user = await User.findById({ _id: id });
  const response = await User.findByIdAndUpdate({ _id: id }, data, {
    new: true,
  }).select("-password -role -refreshToken");
  if (req.file && !response) cloudinary.uploader.destroy(req.file.filename);
  if (req.file && response && user.avatar)
    cloudinary.uploader.destroy(user.fileNameAvatar);
  return res.status(200).json({
    success: response ? true : false,
    mes: response ? "updated." : "Some thing went wrong",
  });
});

const updateUserByAdmin = asyncHandler(async (req, res) => {
  const { uid } = req.params;
  if (!uid || Object.keys(req.body).length === 0)
    throw new Error("missing input");
  const response = await User.findByIdAndUpdate(uid, req.body, {
    new: true,
  }).select("-password -role -refreshToken");
  return res.status(200).json({
    success: response ? true : false,
    mes: response ? "Updated" : "Some thing went wrong",
  });
});

const updateUserAddress = asyncHandler(async (req, res) => {
  const { id } = req.user;
  if (!req.body.address) throw new Error("missing input");
  const response = await User.findByIdAndUpdate(
    { _id: id },
    { $push: { address: req.body.address } },
    {
      new: true,
    }
  ).select("-password -role -refreshToken");
  return res.status(200).json({
    success: response ? true : false,
    deletedUser: response ? response : "Some thing went wrong",
  });
});

const updateWishList = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const { pid } = req.params;
  if (!pid) throw new Error("missing inputs");
  const response = await User.findByIdAndUpdate(
    id,
    { $push: { wishlist: pid } },
    { new: true }
  );
  return res.status(200).json({
    success: response ? true : false,
    mes: response ? "updated your cart." : "Some thing went wrong",
  });
});

const removeWishListInUser = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const { pid } = req.params;
  if (!pid) throw new Error("missing inputs");
  const response = await User.findByIdAndUpdate(
    id,
    { $pull: { wishlist: pid } },
    { new: true }
  );
  return res.status(200).json({
    success: response ? true : false,
    mes: response ? "updated your cart." : "Some thing went wrong",
  });
});

module.exports = {
  login,
  getCurrent,
  createUsers,
  refreshAccessToken,
  logout,
  forgotPassword,
  resetPassword,
  getUsers,
  deleteUser,
  updateUser,
  updateUserByAdmin,
  updateUserAddress,
  updateWishList,
  removeWishListInUser,
  register,
  finalregister,
};
