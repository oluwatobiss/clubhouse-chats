const bcrypt = require("bcryptjs");
const db = require("../models/queries");

async function showHomepage(req, res) {
  await db.createTables();
  const statusTypes = (await db.getAllStatusTypes()).rows;
  !statusTypes.length && (await db.addStatusTypes());
  res.render("index", { title: "Clubhouse Posts", status: req.user?.status });
}

function showSignUpView(req, res) {
  res.render("sign-up", { title: "Clubhouse Posts" });
}

async function signUpUser(req, res, next) {
  const form = req.body;
  bcrypt.hash(form.password, 10, async (err, hashedPassword) => {
    if (err) return next(err);
    try {
      const userId = (
        await db.addUserData(
          form.username,
          form.firstName,
          form.lastName,
          hashedPassword
        )
      ).rows[0].id;
      const authorStatusId = (await db.getAuthorStatusId()).rows[0].id;
      await db.assignUserAnAuthorStatus(userId, authorStatusId);
      res.redirect("/log-in");
    } catch (err) {
      return next(err);
    }
  });
}

function showLoginView(req, res) {
  res.render("log-in", { title: "Clubhouse Posts" });
}

function showNewPostView(req, res) {
  res.render("new-post", { title: "Clubhouse Posts" });
}

function savePost(req, res) {
  console.log(req.body);
}

function showClubSignUpView(req, res) {
  res.render("club-sign-up", { title: "Clubhouse Posts" });
}

async function upgradeUser(req, res, next) {
  const form = req.body;
  try {
    const userData = (await db.getUserDataByUsername(form.username)).rows[0];
    if (!userData) return "Incorrect username";
    const statusData = (await db.getStatusData(form.status)).rows[0];
    const correctStatusPasscode = form.passcode === statusData.passcode;
    if (!correctStatusPasscode) return "Incorrect passcode";
    await db.changeUserStatus(userData.id, statusData.id);
    res.redirect("/");
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  showHomepage,
  showSignUpView,
  signUpUser,
  showLoginView,
  showNewPostView,
  savePost,
  showClubSignUpView,
  upgradeUser,
};
