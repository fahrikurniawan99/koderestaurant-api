const router = require("express").Router();
const controller = require("./controller");
const decodeToken = require("../middlewares/decodeToken");

router.get("/invoices/:id", decodeToken, controller.getInvoice);

module.exports = router;
