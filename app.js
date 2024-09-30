const express = require("express");
const app = express();

app.get("/", (req, res) => res.send("<h1>Hello there!</h1>"));
app.listen(3000, () => console.log("Server listening on port 3000!"));
