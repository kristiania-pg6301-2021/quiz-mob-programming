const {getQuiz} = require("./getQuiz");

console.log("hello world")

const express = require("express");

const app = express();

app.listen(3001, () => {
    console.log("http://localhost:3001")
})

app.get("/api/question", ((req, res) => {
    res.json(getQuiz())
}))