const Category = require("../models/category");
const Product = require("../models/product");
const asyncHandler = require("express-async-handler");
const categoryData = require("../data/category");
const productData = require("../data/data.json");
const slugify = require("slugify");

const fn = async (product) => {
  await Product.create({
    title: product?.title,
    slug: slugify(product?.title) + Math.round(Math.random() * 100) + "",
    description: product?.description,
    brand: product?.brand,
    price: product?.price,
    category: product?.category,
    quantity: Math.round(Math.random() * 1000),
    sold: Math.round(Math.random() * 100),
    images: product?.images,
    thumb: product?.thumb,
    totalRatings: Math.round(Math.random() * 5),
  });
};

const insertProduct = asyncHandler(async (req, res) => {
  const promises = [];
  for (let product of productData) promises.push(fn(product));
  await Promise.all(promises);
  return res.status(200).json("Done data product");
});

const fn2 = async (cate) => {
  await Category.create({
    title: cate?.cate,
    brand: cate?.brand,
    image: cate?.image,
  });
};

const insertCategory = asyncHandler(async (req, res) => {
  const promises = [];
  for (let cate of categoryData) promises.push(fn2(cate));
  await Promise.all(promises);
  return res.status(200).json("Done category");
});

module.exports = {
  insertCategory,
  insertProduct,
};
