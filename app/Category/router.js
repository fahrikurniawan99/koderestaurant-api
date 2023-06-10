const router = require("express").Router();
const controller = require("./controller");

router.get("/categories", controller.getAllCategory);
router.post("/categories", controller.createCategory);
router.put("/categories/:id", controller.updateCategory);
router.delete("/categories/:id", controller.deleteCategory);
router.get("/categories/:id", controller.getCategory);

module.exports = router;
