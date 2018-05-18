var User = require("../models/usermodel")
var bcrypt = require('bcrypt')
//var router = express.Router()

exports.login = function (req, res, next) {
	if (req.body.user && req.body.pass) {
		User.findOne({"username" : req.body.user})
		.select("password").select("username")
		.exec(function (err, user) {
			if (err) { return next(err) }
			if (!user) {
				console.log("oh no")
				res.redirect("/login")
			}
			if (user.password != undefined) {
				bcrypt.compare(req.body.pass, user.password, function (err, valid) {
				if (err) { return next(err) }
				if (!valid) {
					res.redirect("/login")
				} else {
					console.log("Yay")
					req.session.user = "majos002"
					req.session.admin = true
					res.redirect("/")
				}
				})
			} else {
				res.redirect("/login")
			}
		})
	}
}

//Might come back... someday
// exports.reg = function (req, res, next) {
// 	if (req.body.user && req.body.pass) {
// 		var admin = {
// 			username: req.body.user,
// 			password: req.body.pass 
// 		}

// 		User.create(admin, function (err, user) {
// 			if (err) {
// 				return next(err)
// 			} else {
// 				console.log("admin is born!")
// 				res.redirect("/")
// 			}
// 		})
// 	}
// }

exports.logout = function (req, res, next) {
	req.session.destroy()
	console.log("Admin is no more")
	next()
}

exports.authWithoutRedirect = function (req, res, next) {
	if (req.session && req.session.admin && req.session.user == "majos002") {
		res.locals.role = "admin"
		next()
	} else {
		res.locals.role = "pleb"
		next()
	}
}

exports.authWithRedirect = function (req, res, next) {
	if (req.session && req.session.admin && req.session.user == "majos002") {
		res.locals.role = "admin"
		next()
	} else {
		res.locals.role = "pleb"
		res.redirect("/login")
	}
}

