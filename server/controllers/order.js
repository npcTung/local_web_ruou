const Order = require("../models/order");
const asyncHandler = require("express-async-handler");

const createOrder = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const { products, total } = req.body;
  const rs = await Order.create({ products, total, posteBy: id });
  return res.status(200).json({
    success: rs ? true : false,
    createCart: rs ? rs : "cannot create cart",
  });
});

const updateStatus = asyncHandler(async (req, res) => {
  const { oid } = req.params;
  const { status } = req.body;
  if (!status) throw new Error("missing inputs");
  const response = await Order.findByIdAndUpdate(
    oid,
    { status },
    { new: true }
  );
  return res.status(200).json({
    success: response ? true : false,
    response: response ? response : "cannot update cart",
  });
});

const getUserOrder = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const response = await Order.find({ orderBy: id });
  return res.status(200).json({
    success: response ? true : false,
    response: response ? response : "cannot get cart",
  });
});

const getOrders = asyncHandler(async (req, res) => {
  const response = await Order.find();
  return res.status(200).json({
    success: response ? true : false,
    response: response ? response : "cannot get cart",
  });
});

module.exports = {
  createOrder,
  updateStatus,
  getUserOrder,
  getOrders,
};
