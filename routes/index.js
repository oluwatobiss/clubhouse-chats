const { Router } = require("express");
const controller = require("../controllers/index");

const router = Router();

router.get("/", controller.showPosts);
router.get("/sign-up", controller.showSignUpForm);
router.post("/sign-up", controller.signUpUser);
router.get("/log-in", controller.showLoginForm);
router.post("/log-in", controller.loginUser);
router.get("/new-post", controller.showPostForm);
router.post("/new-post", controller.savePost);

module.exports = router;
