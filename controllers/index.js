const { Pool } = require("pg");
const bcrypt = require("bcryptjs");
const createTables = require("../models/schema");

const pool = new Pool({ connectionString: process.env.DB_URI });

function showPosts(req, res) {
  res.render("index", { title: "Clubhouse Posts" });
}

function showSignUpForm(req, res) {
  res.render("sign-up-form", { title: "Clubhouse Posts" });
}

function signUpUser(req, res) {
  const form = req.body;
  bcrypt.hash(form.password, 10, async (err, hashedPassword) => {
    if (err) return next(err);
    try {
      await pool.query(createTables);
      await pool.query(
        "INSERT INTO users (username, first_name, last_name, password) VALUES ($1, $2, $3, $4)",
        [form.username, form.firstName, form.lastName, hashedPassword]
      );
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
