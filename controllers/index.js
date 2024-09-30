function showPosts(req, res) {
  res.render("index", { title: "Homepage" });
}

module.exports = showPosts;
