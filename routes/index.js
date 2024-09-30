const { Router } = require("express");
const controller = require("../controllers/index");

const router = Router();

router.get("/", controller.showPosts);
router.get("/sign-up", controller.showSignUpForm);

module.exports = router;
