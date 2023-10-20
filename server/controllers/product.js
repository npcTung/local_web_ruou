const Product = require("../models/product");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const cloudinary = require("cloudinary").v2;

const createProduct = asyncHandler(async (req, res) => {
  const { title, price, description, category } = req.body;
  const thumb = req?.files?.thumb[0]?.path;
  const images = req?.files?.images?.map((el) => el.path);
  if (!(title && description && category && thumb && images && price)) {
    cloudinary.uploader.destroy(req.files.thumb[0].filename);
    cloudinary.api.delete_resources(
      req?.files?.images?.map((el) => el.filename)
    );
    throw new Error("missing inputs");
  }
  req.body.slug = slugify(title);
  if (thumb) {
    req.body.thumb = thumb;
    req.body.fileNameThumb = req.files.thumb[0].filename;
  }
  if (images) {
    req.body.images = images;
    req.body.fileNameImages = req?.files?.images?.map((el) => el.filename);
  }
  const newProduct = await Product.create(req.body);
  return res.status(200).json({
    success: newProduct ? true : false,
    mes: newProduct ? "Created" : "cannot create new product",
  });
});

const getProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  const product = await Product.findById(pid).populate({
    path: "ratings",
    populate: {
      path: "posteBy",
      select: "firstName lastName avatar",
    },
  });
  return res.status(200).json({
    success: product ? true : false,
    productData: product ? product : "cannot get product",
  });
});
// Filltering, sorting & pagination
const getProducts = asyncHandler(async (req, res) => {
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
  if (queries?.category)
    formatedQueries.category = { $regex: queries.category, $options: "i" };
  if (queries?.color) {
    delete formatedQueries.color;
    const colorArr = queries.color?.split(",");
    const colorQuery = colorArr.map((el) => ({
      color: { $regex: el, $options: "i" },
    }));
    colorQueryObject = { $or: colorQuery };
  }
  let queryObject = {};
  if (queries?.q) {
    delete formatedQueries.q;
    queryObject = {
      $or: [
        { color: { $regex: queries.q, $options: "i" } },
        { title: { $regex: queries.q, $options: "i" } },
        { category: { $regex: queries.q, $options: "i" } },
        { brand: { $regex: queries.q, $options: "i" } },
        { description: { $regex: queries.q, $options: "i" } },
      ],
    };
  }
  const qr = { ...colorQueryObject, ...formatedQueries, ...queryObject };
  let queryCommand = Product.find(qr);
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
    const counts = await Product.find(qr).countDocuments();
    return res.status(200).json({
      success: response ? true : false,
      counts,
      products: response ? response : "cannot get products",
    });
  } catch (err) {
    throw new Error(err.message);
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  const files = req?.files;
  if (files?.thumb) {
    req.body.thumb = files?.thumb[0]?.path;
    req.body.fileNameThumb = files?.thumb[0]?.filename;
  }
  if (files?.images) {
    req.body.images = files?.images?.map((el) => el.path);
    req.body.fileNameImages = files?.images?.map((el) => el.filename);
  }
  if (req.body && req.body.title) req.body.slug = slugify(req.body.title);
  const imageProduct = await Product.findById(pid);
  const updateProduct = await Product.findByIdAndUpdate(pid, req.body, {
    new: true,
  });
  if (files && !updateProduct) {
    cloudinary.uploader.destroy(req.files.thumb[0].filename);
    cloudinary.api.delete_resources(
      req?.files?.images?.map((el) => el.filename)
    );
  }
  if (files && updateProduct) {
    cloudinary.uploader.destroy(imageProduct.fileNameThumb);
    cloudinary.api.delete_resources(
      imageProduct.fileNameImages.map((el) => el)
    );
  }
  return res.status(200).json({
    success: updateProduct ? true : false,
    updatedProduct: updateProduct ? updateProduct : "cannot update products",
  });
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  const deleteProduct = await Product.findByIdAndDelete(pid);
  if (deleteProduct) {
    cloudinary.uploader.destroy(deleteProduct.fileNameThumb);
    cloudinary.uploader.destroy(deleteProduct.varriantis.fileNameThumb);
    cloudinary.api.delete_resources(
      deleteProduct.fileNameImages.map((el) => el)
    );
    cloudinary.api.delete_resources(
      deleteProduct.varriantis.map((el) => el.fileNameImages)
    );
  }
  return res.status(200).json({
    success: deleteProduct ? true : false,
    updatedProduct: deleteProduct
      ? "deleted products"
      : "cannot delete products",
  });
});

const ratings = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const { star, comment, pid, updatedAt } = req.body;
  if (!star || !pid) throw new Error("Missing inputs");
  const ratingProduct = await Product.findById(pid);
  const alreadyRating = ratingProduct?.ratings?.find(
    (el) => el.posteBy.toString() === id
  );
  if (alreadyRating) {
    // update star & comment
    await Product.updateOne(
      {
        ratings: { $elemMatch: alreadyRating },
      },
      {
        $set: {
          "ratings.$.star": star,
          "ratings.$.comment": comment,
          "ratings.$.updatedAt": updatedAt,
        },
      },
      { new: true }
    );
  } else {
    // add star & comment
    await Product.findByIdAndUpdate(
      pid,
      {
        $push: { ratings: { star, comment, posteBy: id, updatedAt } },
      },
      { new: true }
    );
  }
  //Sum rating
  const updatedProduct = await Product.findById(pid);
  const ratingCount = updatedProduct.ratings.length;
  const sumRatings = updatedProduct.ratings.reduce(
    (sum, el) => sum + +el.star,
    0
  );
  updatedProduct.totalRatings =
    Math.round((sumRatings * 10) / ratingCount) / 10;
  await updatedProduct.save();
  return res.status(200).json({
    success: true,
    updatedProduct,
  });
});

const uploadImageProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  if (!req.files) throw new Error("missing files");
  const response = await Product.findByIdAndUpdate(
    pid,
    {
      $push: { images: { $each: req.files.map((el) => el.path) } },
    },
    { new: true }
  );
  return res.status(200).json({
    success: response ? true : false,
    updatedImageProduct: response ? response : "cannot upload images product",
  });
});

const addVarriant = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  const { price, color, quantity } = req.body;
  const thumb = req?.files?.thumb[0]?.path;
  const images = req?.files?.images?.map((el) => el.path);
  if (!(color && thumb && images && price && quantity)) {
    cloudinary.uploader.destroy(req.files.thumb[0].filename);
    cloudinary.api.delete_resources(
      req?.files?.images?.map((el) => el.filename)
    );
    throw new Error("missing inputs");
  }
  const response = await Product.findByIdAndUpdate(
    pid,
    {
      $push: {
        varriantis: {
          color,
          price,
          thumb,
          fileNameThumb: req.files.thumb[0].filename,
          images,
          fileNameImages: req?.files?.images?.map((el) => el.filename),
          quantity,
        },
      },
    },
    { new: true }
  );
  return res.status(200).json({
    success: response ? true : false,
    mes: response ? "Added varriant" : "cannot upload images product",
  });
});

module.exports = {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  ratings,
  uploadImageProduct,
  addVarriant,
};
