const express = require("express")
const path = require("path")
const session = require("express-session")
const bodyParser = require("body-parser")
const about = require("./routes/about")

const app = express()

app.use(session({
    secret: "vcydvcidckdvciydvcdyicvid",
    saveUninitialized: true,
    resave: true
}))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(path.join(__dirname, "/public")))
app.set("view engine", "ejs")

const check = (req, res, next) => {
    if (req.session.email == undefined) {
        res.redirect("/")
    } else {
        next()
    }
}

app.use(about)
app.get("/", (req, res) => {
    req.session.email = "chandarout737@gmail.com"
    const data = {
        title: "Home",
        name: "chandan",
        age: 20,
        address: "wb",
        cities: ['kolkata', 'delhi']
    }
    res.render("index", { data })
})

app.post("/formdata", (req, res) => {
    console.log(req.body)
})

app.get("/contact*", check, (req, res) => {
    const data = {
        title: "Contact"
    }
    res.render("contact", { data })
})

app.get("*", (req, res) => {
    const data = {
        title: 404
    }
    res.status(404).render("404", { data })
})

app.listen(3000, err => {
    if (err) return console.log(err)
    console.log("server run on http://127.0.0.1:3000")
})