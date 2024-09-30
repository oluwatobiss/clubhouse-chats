function showPosts(req, res) {
  res.render("index", { title: "Clubhouse Posts" });
}

function showSignUpForm(req, res) {
  res.render("sign-up-form", { title: "Clubhouse Posts" });
}

function signUpUser(req, res) {
  console.log(req.body);
}

module.exports = { showPosts, showSignUpForm, signUpUser };
