const express = require('express')
const router = express.Router()
const session = require("express-session")

router.use(session({
    secret: "vcydvcidckdvciydvcdyicvid",
    saveUninitialized: true,
    resave: true
}))
const check = (req, res, next) => {
    if (req.session.email == undefined) {
        res.redirect("/")
    } else {
        next()
    }
}
router.get("/about", check, (req, res) => {
    const data = {
        title: "About"
    }
    res.render("about", { data })
})

module.exports = router