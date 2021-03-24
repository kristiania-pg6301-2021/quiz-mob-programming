const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const defaultUser = require("./user")
const authRoutes = require("./authRoutes")
const bodyParser = require("body-parser")
const session = require("express-session")

module.exports = (app) => {
    app.use(bodyParser.json());

    app.use(session({
        secret: "A long and secret secret, hidden away for no one to see",
        cookie: {
        maxAge: 60 * 60 * 60 * 2,
        },
        resave: false,
        saveUninitialized: false,
    }));
    passport.use(new LocalStrategy({
        usernameField: "username",
        passwordField: "password"
    }, (username, password, done) => {
        console.log(username, password)
        if(username !== defaultUser.username || password !== defaultUser.password){
            return done(null, false, {
                message: "Invalid username or password"
            })
        } return done(null, defaultUser)
    }))

    passport.serializeUser((user, done) => {
        console.log(user.username, "ser")
        done(null, user)
    })

    passport.deserializeUser((user, done) => {
        console.log(user.username, "deSer")
        if(user.username !== defaultUser.username || user.password !== defaultUser.password){
            return done(null, false)
        } return done(null, user)
    })

    app.use(passport.initialize())
    app.use(passport.session())
    app.use("/api", authRoutes)
    
}