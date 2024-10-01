require("dotenv").config();
const express = require("express");
const session = require("express-session");
const path = require("node:path");
const indexRouter = require("./routes/index");

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use("/", indexRouter);

app.listen(port, () => console.log(`Server listening on port ${port}!`));
