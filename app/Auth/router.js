const router = require("express").Router();
const controller = require("./controller");
const passport = require("passport");
const LocalStrategy = require("../middlewares/localStrategy");
const decodeToken = require("../middlewares/decodeToken");

passport.use(LocalStrategy);
router.post("/register", controller.register);
router.post("/login", controller.login);
router.post("/logout", controller.logout);
router.get("/refresh-token", controller.refreshToken);
router.get("/profile", decodeToken, controller.profile);

module.exports = router;
