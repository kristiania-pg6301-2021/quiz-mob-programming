const { getQuiz } = require("./getQuiz");

console.log("hello world");

const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.resolve(__dirname, "..", "..", "dist")));

app.listen(3001, () => {
  console.log("http://localhost:3001");
});

app.get("/api/question", (req, res) => {
  res.json(getQuiz());
});
