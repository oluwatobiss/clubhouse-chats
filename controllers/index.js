const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const db = require("../models/queries");
const signUpValidator = require("./validators");

async function showHomepage(req, res, next) {
  const userData = req.user;
  let posts = null;
  try {
    await db.createTables();
    const statusTypes = (await db.getAllStatusTypes()).rows;
    !statusTypes.length && (await db.addStatusTypes());

    if (!userData || userData?.status === "author")
      posts = (await db.getMessagesOnly()).rows;
    if (userData?.status === "member" || userData?.status === "admin")
      posts = (await db.getMessagesAndBios()).rows;

    res.render("index", {
      title: "Clubhouse Posts",
      userStatus: userData?.status,
      posts,
    });
  } catch (err) {
    return next(err);
  }
}

function showSignUpView(req, res) {
  res.render("sign-up", {
    title: "Clubhouse Posts",
    errInputs: {
      firstName: "",
      lastName: "",
      username: "",
    },
  });
}

const signUpUser = [
  signUpValidator,
  async function (req, res, next) {
    const { firstName, lastName, username, password } = req.body;
    const result = validationResult(req);
    if (!result.isEmpty()) {
      console.log(result.array());
      return res.status(400).render("sign-up", {
        title: "Clubhouse Posts",
        errors: result.array(),
        errInputs: {
          firstName,
          lastName,
          username,
        },
      });
    }
    bcrypt.hash(password, 10, async (err, hashedPassword) => {
      if (err) return next(err);
      try {
        const userId = (
          await db.addUserData(firstName, lastName, username, hashedPassword)
        ).rows[0].id;
        const authorStatusId = (await db.getAuthorStatusId()).rows[0].id;
        await db.assignUserAnAuthorStatus(userId, authorStatusId);
        res.redirect("/log-in");
      } catch (err) {
        return next(err);
      }
    });
  },
];

function showLoginView(req, res) {
  res.render("log-in", { title: "Clubhouse Posts" });
}

function showNewPostView(req, res) {
  const userData = req.user;
  res.render("new-post", {
    title: "Clubhouse Posts",
    userStatus: userData?.status,
  });
}

async function savePost(req, res, next) {
  try {
    const form = req.body;
    const postId = (await db.addUserPost(form.title, form.text)).rows[0].id;
    await db.creditPostToUser(req.user.user_id, postId);
    res.redirect("/");
  } catch (err) {
    return next(err);
  }
}

function showClubSignUpView(req, res) {
  const userData = req.user;
  res.render("club-sign-up", {
    title: "Clubhouse Posts",
    userStatus: userData?.status,
  });
}

async function upgradeUser(req, res, next) {
  try {
    const form = req.body;
    const statusData = (await db.getStatusData(form.status)).rows[0];
    const correctStatusPasscode = form.passcode === statusData.passcode;
    if (!correctStatusPasscode) return "Incorrect passcode";
    await db.changeUserStatus(req.user.user_id, statusData.id);
    res.redirect("/");
  } catch (err) {
    return next(err);
  }
}

async function deletePost(req, res, next) {
  try {
    await db.deletePost(req.params.postId);
    res.redirect("/");
  } catch (err) {
    return next(err);
  }
}

function logUserOut(req, res, next) {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
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
  deletePost,
  logUserOut,
};
