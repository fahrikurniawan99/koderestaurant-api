const router = require("express").Router();
const controller = require("./controller");
const upload = require("../libs/upload");
const decodeToken = require("../middlewares/decodeToken");
const policy = require("../middlewares/policy");

router.get("/products", controller.getAllProduct);
router.post(
  "/products",
  upload.single("image"),
  decodeToken,
  policy("create", "Product"),
  controller.createProduct
);
router.put(
  "/products/:id",
  upload.single("image"),
  decodeToken,
  policy("update", "Product"),
  controller.updateProduct
);
router.delete(
  "/products/:id",
  decodeToken,
  policy("delete", "Product"),
  controller.deleteProduct
);
router.get("/products/:id", controller.getProduct);

module.exports = router;
