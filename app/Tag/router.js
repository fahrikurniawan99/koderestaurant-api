const router = require("express").Router();
const controller = require("./controller");

router.get("/tags", controller.getAllTag);
router.post("/tags", controller.createTag);
router.put("/tags/:id", controller.updateTag);
router.delete("/tags/:id", controller.deleteTag);
router.get("/tags/:id", controller.getTag);

module.exports = router;
