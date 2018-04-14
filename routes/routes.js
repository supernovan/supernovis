const router = require("express").Router();

router.get("/", function(req, res) {
	res.render("index")
})

router.get("/about", function(req, res) {
	res.render("about")
})

router.get("/projects/lamp", function(req, res) {
	res.render("lamp")
})

router.get("/projects/selfbalancingrobot", function(req, res) {
	res.render("selfbalancingrobot")
})

router.get("/projects/website", function(req, res) {
	res.render("website")
})

router.get("/projects/predictelection", function(req, res) {
	res.render("predictelection")
})

router.get("/blog", function(req, res) {
	res.render("blog")
})



module.exports = router


