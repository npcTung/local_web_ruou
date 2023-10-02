const Brand = require("../models/brand");
const asyncHandler = require("express-async-handler");

const createNewBrand = asyncHandler(async (req, res) => {
  if (Object.keys(req.body).length === 0) throw new Error("missing input");
  const response = await Brand.create(req.body);
  return res.status(200).json({
    success: response ? true : false,
    createdBrand: response ? response : "cannot create new brand",
  });
});

const getBrands = asyncHandler(async (req, res) => {
  const response = await Brand.find().select("-createdAt -updatedAt");
  return res.status(200).json({
    success: response ? true : false,
    brand: response ? response : "cannot get brand",
  });
});

const updateBrand = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  if (Object.keys(req.body).length === 0) throw new Error("missing input");
  const response = await Brand.findByIdAndUpdate(bid, req.body, {
    new: true,
  });
  return res.status(200).json({
    success: response ? true : false,
    updatedBrand: response ? response : "cannot update brand",
  });
});

const deleteBrand = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  const response = await Brand.findByIdAndDelete(bid, req.body, {
    new: true,
  });
  return res.status(200).json({
    success: response ? true : false,
    deletedBrand: response ? "deleted brand" : "cannot delete brand",
  });
});

module.exports = {
  createNewBrand,
  getBrands,
  updateBrand,
  deleteBrand,
};
