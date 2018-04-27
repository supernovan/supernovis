const router = require("express").Router()
const usercontroller = require("../controllers/usercontroller.js")
var postcontroller = require("../controllers/postcontroller.js")


router.get("/", usercontroller.authWithoutRedirect, function(req, res) {
	res.render("index")
})

router.get("/about", usercontroller.authWithoutRedirect, function(req, res) {
	res.render("about")
})

router.get("/projects/lamp", usercontroller.authWithoutRedirect, function(req, res) {
	res.render("lamp")
})

router.get("/projects/games", usercontroller.authWithoutRedirect,function(req, res) {
	res.render("games")
})

router.get("/projects/selfbalancingrobot", usercontroller.authWithoutRedirect, function(req, res) {
	res.render("selfbalancingrobot")
})

router.get("/projects/website", usercontroller.authWithoutRedirect, function(req, res) {
	res.render("website")
})

router.get("/projects/predictelection", usercontroller.authWithoutRedirect, function(req, res) {
	res.render("predictelection")
})

router.get("/blog", usercontroller.authWithoutRedirect, postcontroller.previousBlogposts)

router.get("/login", usercontroller.authWithoutRedirect, function(req, res) {
	res.render("login")
})

//router.get("/register", usercontroller.authWithoutRedirect, function(req, res) {
//	res.render("register")
//})

router.get("/aiplayinggames", usercontroller.authWithoutRedirect, function(req, res) {
	res.render("aiplayinggames")
})

router.get("/logs", usercontroller.authWithoutRedirect, function(req, res) {
	res.render("logs")
})

router.get("/logout",usercontroller.logout ,function(req, res) {
	res.render("index")
})




module.exports = router


