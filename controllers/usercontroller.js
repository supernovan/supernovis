var User = require("../models/usermodel")
var bcrypt = require('bcrypt')
//var router = express.Router()
var jwt = require("jsonwebtoken")
var secret = require("../config/jwtsecret.js")

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
			if (user != null) {
				bcrypt.compare(req.body.pass, user.password, function (err, valid) {
					if (err) { return next(err) }
					if (!valid) {
						res.redirect("/login")
					} else {
						console.log("Yay")
						req.session.user = "majos002"
						req.session.admin = true
						console.log(secret)
						var token = jwt.sign({user: "majos002"}, secret, {
							expiresIn: 86400*7
						})
						res.cookie("jwt", token)
						res.redirect("/")
					}
				})
			} else {
				//res.redirect("/login")
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
	console.log("login check")
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

exports.authJWT = function (req, res, next) {
	var token = req.body.token
	if (!token) {
		return res.status(401)
	}
	console.log(token)
	console.log(secret)
	console.log(req.body)
	jwt.verify(token, secret, function(err, decoded) {
		if (err) {
			console.error("Error with decoding the token")
			return res.status(500)
		}

		User.findOne({"username" : decoded.user}, function (err, user) {
			if (err) {
				console.error("Error with finding the user")
				return res.status(500)
			}
			if (!user) {
				console.error("Error user not found")
				return res.status(404)
			}
			console.log("Great success, moving on")
			next()
		})
	})
}

