require("dotenv").config();
const express = require("express");
const pg = require("pg");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const passport = require("passport");
const path = require("node:path");
const indexRouter = require("./routes/index");

const app = express();
const port = process.env.PORT || 3000;

const pgPool = new pg.Pool({ connectionString: process.env.DB_URI });
const sessionStore = new pgSession({
  pool: pgPool,
  tableName: "user_sessions",
  createTableIfMissing: true,
});

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    store: sessionStore,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.session());
app.use((req, res, next) => {
  res.locals.appName = "Clubhouse Chats";
  next();
});

app.use("/", indexRouter);
app.use((err, req, res, next) => {
  const userData = req.user;
  err &&
    res.status(400).render("error", {
      userStatus: userData?.status,
      error: `${err.message}`,
    });
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));
