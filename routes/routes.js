const router = require("express").Router()
const usercontroller = require("../controllers/usercontroller.js")
var postcontroller = require("../controllers/postcontroller.js")
var textcontroller = require("../controllers/textcontroller.js")

router.get("/", usercontroller.authWithoutRedirect, function(req, res) {
	res.redirect("/index")
})

router.get("/index", usercontroller.authWithoutRedirect, textcontroller.textforpage)

router.get("/about", usercontroller.authWithoutRedirect, textcontroller.textforpage)

router.get("/calender", usercontroller.authWithoutRedirect, function(req, res) {
	res.render("calendar")
})

function checkWildcard(req, res, next) {
	correctUrl = ["1337", "98279"]
	console.log(req.path)
	if (correctUrl.includes(req.params.id)) {
		res.render(req.params.id)
	} else {
		res.render("index")
	}
}

router.get("/gift/:id", usercontroller.authWithoutRedirect, checkWildcard)

router.get("/projects/lamp", usercontroller.authWithoutRedirect, textcontroller.textforpage)

router.get("/projects/games", usercontroller.authWithoutRedirect,textcontroller.textforpage)

router.get("/projects/selfbalancingrobot", usercontroller.authWithoutRedirect, textcontroller.textforpage)

router.get("/projects/website", usercontroller.authWithoutRedirect, textcontroller.textforpage)

router.get("/projects/predictelection", usercontroller.authWithoutRedirect, textcontroller.textforpage)

router.get("/blog", usercontroller.authWithoutRedirect, postcontroller.previousBlogposts)

router.get("/uploadfile", usercontroller.authWithRedirect, function (req, res) {
	res.render("uploadfile")
})

router.get("/login", usercontroller.authWithoutRedirect, function(req, res) {
	res.render("login")
})

//router.get("/register", usercontroller.authWithoutRedirect, function(req, res) {
//	res.render("register")
//})

router.get("/aiplayinggames", usercontroller.authWithoutRedirect, textcontroller.textforpage)

/*router.get("/logs", usercontroller.authWithoutRedirect, function(req, res) {
	res.render("logs")
})*/

router.get("/logout",usercontroller.logout ,function(req, res) {
	res.render("index")
})




module.exports = router


