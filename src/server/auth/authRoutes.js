const express = require("express")
const router = express.Router()
const passport = require("passport")

router.post("/login", passport.authenticate("local"), (req, res) => {
    res.sendStatus(204)
})

module.exports = router