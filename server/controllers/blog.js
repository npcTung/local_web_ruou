const Blog = require("../models/blog");
const asyncHandler = require("express-async-handler");

const createNewBlog = asyncHandler(async (req, res) => {
  const { title, description, category } = req.body;
  if (!title || !description || !category) throw new Error("missing inputs");
  const response = await Blog.create(req.body);
  return res.status(200).json({
    success: response ? true : false,
    createdBlog: response ? response : "cannot create new blog",
  });
});

const updateBlog = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  if (Object.keys(req.body).length === 0) throw new Error("missing inputs");
  const response = await Blog.findByIdAndUpdate(bid, req.body, { new: true });
  return res.status(200).json({
    success: response ? true : false,
    updatedBlog: response ? response : "cannot update blog",
  });
});

const getBlogs = asyncHandler(async (req, res) => {
  const response = await Blog.find();
  return res.status(200).json({
    success: response ? true : false,
    Blog: response ? response : "cannot get blog",
  });
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
      {
        $pull: { dislikes: id },
      },
      { new: true }
    );
    return res.status(200).json({
      success: response ? true : false,
      rs: response,
    });
  }
  const isLiked = blog?.likes?.find((el) => el.toString() === id);
  if (isLiked) {
    const response = await Blog.findByIdAndUpdate(
      bid,
      {
        $pull: { likes: id },
      },
      { new: true }
    );
    return res.status(200).json({
      success: response ? true : false,
      rs: response,
    });
  } else {
    const response = await Blog.findByIdAndUpdate(
      bid,
      { $push: { likes: id } },
      { new: true }
    );
    return res.status(200).json({
      success: response ? true : false,
      rs: response,
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
      rs: response,
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
      rs: response,
    });
  } else {
    const response = await Blog.findByIdAndUpdate(
      bid,
      { $push: { dislikes: id } },
      { new: true }
    );
    return res.status(200).json({
      success: response ? true : false,
      rs: response,
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
    rs: blog,
  });
});

const deleteBlog = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  const blog = await Blog.findByIdAndDelete(bid);
  return res.status(200).json({
    success: blog ? true : false,
    deletedBlog: blog ? "deleted blog" : "cannot delete blog",
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
