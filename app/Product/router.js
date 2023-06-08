const router = require("express").Router();
const controller = require("./contoller");
const multer = require("multer");
const os = require("os");

router.get("/products", controller.getAllProduct);
router.post(
  "/products",
  multer({ dest: os.tmpdir() }).single("image"),
  controller.createProduct
);

module.exports = router;
