const ProductRoute = require("express").Router();
const multer = require("multer");
const os = require("os");
const controller = require("./controller");

ProductRoute.post("/products", controller.create);

module.exports = ProductRoute;
