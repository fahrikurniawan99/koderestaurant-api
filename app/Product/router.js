const router = require("express").Router();
const controller = require("./controller");
const upload = require("../libs/upload");

router.get("/products", controller.getAllProduct);
router.post("/products", upload.single("image"), controller.createProduct);
router.put("/products/:id", upload.single("image"), controller.updateProduct);
router.delete("/products/:id", controller.deleteProduct);
router.get("/products/:id", controller.getProduct);

module.exports = router;
