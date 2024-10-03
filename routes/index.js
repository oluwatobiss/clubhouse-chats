const { Router } = require("express");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const controller = require("../controllers/index");
const db = require("../models/queries");

const router = Router();

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const userData = (await db.getUserDataByUsername(username)).rows[0];
      const match = await bcrypt.compare(password, userData.password);
      if (!userData)
        return done(null, false, { message: "Incorrect username" });
      if (!match) return done(null, false, { message: "Incorrect password" });
      return done(null, userData);
    } catch (err) {
      return done(err);
    }
  })
);
passport.serializeUser((userData, done) => {
  done(null, userData.id);
});
passport.deserializeUser(async (id, done) => {
  try {
    const userData = (await db.getUserDataById(id)).rows[0];
    done(null, userData);
  } catch (err) {
    done(err);
  }
});

router.get("/", controller.showHomepage);
router.get("/sign-up", controller.showSignUpView);
router.post("/sign-up", controller.signUpUser);
router.get("/log-in", controller.showLoginView);
router.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/log-in",
  })
);
router.get("/new-post", controller.showNewPostView);
router.post("/new-post", controller.savePost);
router.get("/join-club", controller.showClubSignUpView);
router.post("/join-club", controller.upgradeUser);
router.post("/delete/:postId", controller.deletePost);

module.exports = router;
