const ProductRoute = require("express").Router();
const multer = require("multer");
const os = require("os");
const controller = require("./controller");

ProductRoute.post(
  "/products",
  multer({ dest: os.tmpdir() }).single("image"),
  controller.create
);

module.exports = ProductRoute;
