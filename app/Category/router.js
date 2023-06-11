const router = require("express").Router();
const decodeToken = require("../middlewares/decodeToken");
const policy = require("../middlewares/policy");
const controller = require("./controller");

router.get("/categories", controller.getAllCategory);
router.post(
  "/categories",
  decodeToken,
  policy("create", "Category"),
  controller.createCategory
);
router.put(
  "/categories/:id",
  decodeToken,
  policy("update", "Category"),
  controller.updateCategory
);
router.delete(
  "/categories/:id",
  decodeToken,
  policy("delete", "Category"),
  controller.deleteCategory
);
router.get("/categories/:id", controller.getCategory);

module.exports = router;
