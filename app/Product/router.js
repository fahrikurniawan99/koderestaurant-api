const router = require("express").Router();
const controller = require("./contoller");
const upload = require("../libs/upload");

router.get("/products", controller.getAllProduct);
router.post("/products", upload.single("image"), controller.createProduct);

module.exports = router;
