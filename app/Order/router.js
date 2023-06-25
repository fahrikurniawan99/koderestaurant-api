const router = require("express").Router();
const decodeToken = require("../middlewares/decodeToken");
const controller = require("./controller");

router.post("/orders", decodeToken, controller.createOrder);
router.get("/orders", decodeToken, controller.getOrders);

module.exports = router;
