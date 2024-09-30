function showPosts(req, res) {
  res.render("index", { title: "Clubhouse Posts" });
}

function showSignUpForm(req, res) {
  res.render("sign-up-form", { title: "Clubhouse Posts" });
}

function signUpUser(req, res) {
  console.log(req.body);
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

module.exports = {
  showPosts,
  showSignUpForm,
  signUpUser,
  showLoginForm,
  loginUser,
  showPostForm,
  savePost,
};
