const User = require("./user");
const Product = require("./product");
const Order = require("./order");
const Category = require("./category");
const Coupon = require("./coupon");
const Brand = require("./brand");
const blogCategory = require("./blogCategory");
const Blog = require("./blog");
const Insert = require("./insert");
const { errHandler, notFound } = require("../middlewares/errHandler");

const initRouter = (app) => {
  app.use("/api/v1/user", User);
  app.use("/api/v1/product", Product);
  app.use("/api/v1/order", Order);
  app.use("/api/v1/category", Category);
  app.use("/api/v1/coupon", Coupon);
  app.use("/api/v1/brand", Brand);
  app.use("/api/v1/blog-category", blogCategory);
  app.use("/api/v1/blog", Blog);
  app.use("/api/v1/insert", Insert);

  app.use(notFound);
  app.use(errHandler);
};

module.exports = initRouter;
