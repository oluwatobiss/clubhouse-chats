const { Pool } = require("pg");
const bcrypt = require("bcryptjs");
const db = require("../models/queries");

const pool = new Pool({ connectionString: process.env.DB_URI });

async function showPosts(req, res) {
  await db.createTables();
  const statusTypes = (await db.getAllStatusTypes()).rows;
  !statusTypes.length && (await db.addStatusTypes());
  res.render("index", { title: "Clubhouse Posts" });
}

function showSignUpForm(req, res) {
  res.render("sign-up-form", { title: "Clubhouse Posts" });
}

function signUpUser(req, res, next) {
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

function showLoginForm(req, res) {
  res.render("log-in-form", { title: "Clubhouse Posts" });
}

function loginUser(req, res) {
  console.log(req.body);
}

function showPostForm(req, res) {
  res.render("post-form", { title: "Clubhouse Posts" });
}

function savePost(req, res) {
  console.log(req.body);
}

function showClubForm(req, res) {
  res.render("club-form", { title: "Clubhouse Posts" });
}

function upgradeUser(req, res) {
  console.log(req.body);
}

module.exports = {
  showPosts,
  showSignUpForm,
  signUpUser,
  showLoginForm,
  loginUser,
  showPostForm,
  savePost,
  showClubForm,
  upgradeUser,
};
