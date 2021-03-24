const { getQuiz } = require("./getQuiz");

const express = require("express");
const path = require("path");

const app = express();
require("./auth/authRoutes")(app)

app.use(express.static(path.resolve(__dirname, "..", "..", "dist")));

app.listen(3001, () => {
  console.log("http://localhost:3001");
});

app.get("/api/question", (req, res) => {
  res.json(getQuiz());
});
