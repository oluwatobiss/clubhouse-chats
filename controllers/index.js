function showPosts(req, res) {
  res.render("index", { title: "Clubhouse Posts" });
}

function showSignUpForm(req, res) {
  res.render("sign-up-form", { title: "Clubhouse Posts" });
}

module.exports = { showPosts, showSignUpForm };
