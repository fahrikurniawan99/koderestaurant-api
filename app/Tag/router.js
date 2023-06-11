const router = require("express").Router();
const decodeToken = require("../middlewares/decodeToken");
const policy = require("../middlewares/policy");
const controller = require("./controller");

router.get("/tags", controller.getAllTag);
router.post(
  "/tags",
  decodeToken,
  policy("create", "Tag"),
  controller.createTag
);
router.put(
  "/tags/:id",
  decodeToken,
  policy("update", "Tag"),
  controller.updateTag
);
router.delete(
  "/tags/:id",
  decodeToken,
  policy("delete", "Tag"),
  controller.deleteTag
);
router.get("/tags/:id", controller.getTag);

module.exports = router;
