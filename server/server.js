const express = require("express");
require("dotenv").config();
const cors = require("cors");
const dbConnection = require("./config/dbConnect");
const initRouter = require("./routers");
const cookieParser = require("cookie-parser");

const app = express();
const port = process.env.PORT || 8088;

app.use(
  cors({
    origin: process.env.URL_CLIENT,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
dbConnection();
initRouter(app);

app.listen(port, () => {
  console.log("Server running on the port:", port);
});
