const router = require("express").Router()
const usercontroller = require("../controllers/usercontroller.js")
const postcontroller = require("../controllers/postcontroller.js")
const textcontroller = require("../controllers/textcontroller.js")
const trellocontroller = require("../controllers/trellocontroller.js")
const co2controller = require("../controllers/co2controller")

router.get("/",  function(req, res) {
	res.redirect("/index")
})

router.get("/index", usercontroller.authWithoutRedirect, textcontroller.textforpage)

router.get("/about", usercontroller.authWithoutRedirect, textcontroller.textforpage)

router.get("/calender", usercontroller.authWithoutRedirect, function(req, res) {
	res.render("calendar")
})

function checkWildcard(req, res, next) {
	correctUrl = ["2", "28", "4599", "intro", "56"]
	console.log(req.path)
	if (correctUrl.includes(req.params.id)) {
	
	} else {
		req.url = "index"	
	}
	next()
}

router.get("/gift/:id", usercontroller.authWithoutRedirect, checkWildcard, textcontroller.textforpage)

router.get("/projects/lamp", usercontroller.authWithoutRedirect, textcontroller.textforpage)

router.get("/projects/plants", usercontroller.authWithoutRedirect, textcontroller.textforpage)

router.get("/projects/games", usercontroller.authWithoutRedirect,textcontroller.textforpage)

router.get("/projects/selfbalancingrobot", usercontroller.authWithoutRedirect, textcontroller.textforpage)

router.get("/projects/website", usercontroller.authWithoutRedirect, textcontroller.textforpage)

router.get("/projects/predictelection", usercontroller.authWithoutRedirect, textcontroller.textforpage)

router.get("/blog", usercontroller.authWithoutRedirect, postcontroller.previousBlogposts)

router.get("/co2", co2controller.co2All)

// router.get("/uploadfile", usercontroller.authWithRedirect, function (req, res) {
// 	res.render("uploadfile")
// })

router.get("/login", usercontroller.authWithoutRedirect, function(req, res) {
	res.render("login")
})

router.get("/trello", usercontroller.authWithoutRedirect, trellocontroller.tablesForPage)

router.get("/register", usercontroller.authWithoutRedirect, function(req, res) {
	res.render("register")
})

router.get("/aiplayinggames", usercontroller.authWithoutRedirect, textcontroller.textforpage)

/*router.get("/logs", usercontroller.authWithoutRedirect, function(req, res) {
	res.render("logs")
})*/

router.get("/logout",usercontroller.logout ,function(req, res) {
	res.render("index")
})




module.exports = router


