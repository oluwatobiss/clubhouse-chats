require("dotenv").config();
const express = require("express");
const indexRouter = require("./routes/index");

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use("/", indexRouter);

app.listen(port, () => console.log(`Server listening on port ${port}!`));
