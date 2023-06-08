const router = require("express").Router();
const controller = require("./contoller");

router.get("/products", controller.getAllProduct);

module.exports = router;
