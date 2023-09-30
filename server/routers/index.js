const User = require("./user");
const Product = require("./producr");
const { errHandler, notFound } = require("../middlewares/errHandler");

const initRouter = (app) => {
  app.use("/api/v1/user", User);
  app.use("/api/v1/product", Product);

  app.use(notFound);
  app.use(errHandler);
};

module.exports = initRouter;
