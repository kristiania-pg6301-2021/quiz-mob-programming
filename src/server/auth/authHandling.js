const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const defaultUser = require("./user")
const authRoutes = require("./authRoutes")

module.exports = (app) => {

    passport.use(new LocalStrategy({
        usernameField: "username",
        passwordField: "password"
    }, (username, password, done) => {
        if(username !== defaultUser.username || password !== defaultUser.password){
            return done(null, false, {
                message: "Invalid username or password"
            })
        } return done(null, defaultUser)
    }))

    passport.serializeUser((user, done) => {
        done(null, user)
    })

    passport.deserializeUser((user, done) => {
        if(user.username !== defaultUser.username || user.password !== defaultUser.password){
            return done(null, false)
        } return done(null, user)
    })

    app.use(passport.initialize())
    app.use(passport.session())
    app.use("/api", authRoutes)
    
}