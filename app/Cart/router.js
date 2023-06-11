const router = require("express").Router();
const decodeToken = require("../middlewares/decodeToken");
const policy = require("../middlewares/policy");
const controller = require("./controller");

router.put("/carts", decodeToken, controller.updateCartItem);
router.get("/carts", decodeToken, controller.getAllItem);

module.exports = router;
