const Blog = require("../models/blog");
const asyncHandler = require("express-async-handler");
const cloudinary = require("cloudinary").v2;

const createNewBlog = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  const image = req?.file?.path;
  if (!title || !description || !image) {
    cloudinary.uploader.destroy(req?.file?.filename);
    throw new Error("missing inputs");
  }
  req.body.image = image;
  req.body.fileNameImage = req?.file?.filename;
  const response = await Blog.create(req.body);
  return res.status(200).json({
    success: response ? true : false,
    createdBlog: response ? response : "cannot create new blog",
  });
});

const updateBlog = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  if (Object.keys(req.body).length === 0) {
    cloudinary.uploader.destroy(req?.file?.filename);
    throw new Error("missing inputs");
  }
  if (req.file) {
    req.body.image = req.file.path;
    req.body.fileNameImage = req.file.filename;
  }
  const blog = await Blog.findById(bid);
  const response = await Blog.findByIdAndUpdate(bid, req.body, { new: true });
  if (response && blog.fileNameImage)
    cloudinary.uploader.destroy(blog.fileNameImage);
  return res.status(200).json({
    success: response ? true : false,
    updatedBlog: response ? response : "cannot update blog",
  });
});

const getBlogs = asyncHandler(async (req, res) => {
  const queries = { ...req.query };
  // Tách các trường đặc biệt ra khỏi query
  const excludefields = ["limit", "sort", "page", "fields"];
  excludefields.forEach((el) => delete queries[el]);
  // Format lại các operators cho đúng cú pháp của mongoose
  let queryString = JSON.stringify(queries);
  queryString = queryString.replace(
    /\b(gte|gt|lt|lte)\b/g,
    (macthedEl) => `$${macthedEl}`
  );
  const formatedQueries = JSON.parse(queryString);
  let colorQueryObject = {};
  // Filltering
  if (queries?.title)
    formatedQueries.title = { $regex: queries.title, $options: "i" };
  let queryObject = {};
  if (queries?.q) {
    delete formatedQueries.q;
    queryObject = {
      $or: [{ title: { $regex: queries.q, $options: "i" } }],
    };
  }
  const qr = { ...colorQueryObject, ...formatedQueries, ...queryObject };
  let queryCommand = Blog.find(qr);
  // Sorting
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    queryCommand = queryCommand.sort(sortBy);
  }
  // Fields limitimg
  if (req.query.fields) {
    const fields = req.query.fields.split(",").join(" ");
    queryCommand = queryCommand.select(fields);
  }
  // Pagination
  const page = +req.query.page || 1;
  const limit = +req.query.limit || process.env.LIMIT_PRODUCT;
  const skip = (page - 1) * limit;
  queryCommand = queryCommand.skip(skip).limit(limit);
  //Execute query
  try {
    const response = await queryCommand.exec();
    const counts = await Blog.find(qr).countDocuments();
    return res.status(200).json({
      success: response ? true : false,
      counts,
      blog: response ? response : "cannot get products",
    });
  } catch (err) {
    throw new Error(err.message);
  }
});
/**
 * LIKE
 * DISLIKE
 *
 * Khi người dùng like 1 bài blog
 * 1. Check xem người dùng trước đó có dislike hay không => bỏ dislike
 * 2. Check xem người đó trước đó có like hay không => bỏ like / thêm like
 */
const likeBlog = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const { bid } = req.params;
  if (!bid) throw new Error("missing inputs");
  const blog = await Blog.findById(bid);
  const alreadyDislike = blog?.dislikes?.find((el) => el.toString() === id);
  if (alreadyDislike) {
    const response = await Blog.findByIdAndUpdate(
      bid,
      { $pull: { dislikes: id } },
      { new: true }
    );
    return res.status(200).json({
      success: response ? true : false,
      mes: response ? "Thành công!" : "Thất bại!",
    });
  }
  const isLiked = blog?.likes?.find((el) => el.toString() === id);
  if (isLiked) {
    const response = await Blog.findByIdAndUpdate(
      bid,
      { $pull: { likes: id } },
      { new: true }
    );
    return res.status(200).json({
      success: response ? true : false,
      mes: response ? "Thành công!" : "Thất bại!",
    });
  } else {
    const response = await Blog.findByIdAndUpdate(
      bid,
      { $push: { likes: id } },
      { new: true }
    );
    return res.status(200).json({
      success: response ? true : false,
      mes: response ? "Thành công!" : "Thất bại!",
    });
  }
});

const dislikeBlog = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const { bid } = req.params;
  if (!bid) throw new Error("missing inputs");
  const blog = await Blog.findById(bid);
  const alreadyLike = blog?.likes?.find((el) => el.toString() === id);
  if (alreadyLike) {
    const response = await Blog.findByIdAndUpdate(
      bid,
      {
        $pull: { likes: id },
      },
      { new: true }
    );
    return res.status(200).json({
      success: response ? true : false,
      mes: response ? "Thành công!" : "Thất bại!",
    });
  }
  const isDisliked = blog?.dislikes?.find((el) => el.toString() === id);
  if (isDisliked) {
    const response = await Blog.findByIdAndUpdate(
      bid,
      {
        $pull: { dislikes: id },
      },
      { new: true }
    );
    return res.status(200).json({
      success: response ? true : false,
      mes: response ? "Thành công!" : "Thất bại!",
    });
  } else {
    const response = await Blog.findByIdAndUpdate(
      bid,
      { $push: { dislikes: id } },
      { new: true }
    );
    return res.status(200).json({
      success: response ? true : false,
      mes: response ? "Thành công!" : "Thất bại!",
    });
  }
});

const getBlog = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  const blog = await Blog.findByIdAndUpdate(
    bid,
    { $inc: { numberViews: 1 } },
    { new: true }
  )
    .populate("likes", "firtname lastname")
    .populate("dislikes", "firtname lastname");
  return res.status(200).json({
    success: blog ? true : false,
    blog: blog,
  });
});

const deleteBlog = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  const blog = await Blog.findById(bid);
  const response = await Blog.findByIdAndDelete(bid);
  if (response && blog.fileNameImage)
    cloudinary.uploader.destroy(blog.fileNameImage);
  return res.status(200).json({
    success: response ? true : false,
    deletedBlog: response ? "deleted blog" : "cannot delete blog",
  });
});

const uploadImageBlog = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  if (!req.file) throw new Error("missing files");
  const response = await Blog.findByIdAndUpdate(
    bid,
    { image: req.file.path },
    { new: true }
  );
  return res.status(200).json({
    success: response ? true : false,
    updatedImageBlog: response ? response : "cannot upload images blog",
  });
});

module.exports = {
  createNewBlog,
  updateBlog,
  getBlogs,
  likeBlog,
  dislikeBlog,
  getBlog,
  deleteBlog,
  uploadImageBlog,
};
