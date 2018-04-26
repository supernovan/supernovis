var Post = require("../models/textmodel")

exports.postblog = function (req, res, next) {
	if (req.body.header && req.body.text) {
		var blogpost = {
			//This should be fixed if I ever get more people that can blog
			author: "Supernovan",
			header: req.body.header,
			text: req.body.text,
			created: Date.now()
		}
		// console.log(blogpost.author + " : " + blogpost.header + " : " + blogpost.text + " : " + blogpost.created)
		Post.create(blogpost, function (err, user) {
			if (err) {
				console.log("it failed")
				next(err)
			} else {
				console.log("blogpost created")
				res.redirect("/blog")	
			}
		})
	}
}

/*exports.login = function (req, res, next) {
	if (req.body.user && req.body.pass) {
		User.findOne({"username" : req.body.user})
		.select("password").select("username")
		.exec(function (err, user) {
			if (err) { return next(err) }
			if (!user) {
				console.log("oh no")
				res.redirect("/login")
			}

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

		})
	}
}*/

exports.deleteblog = function (req, res) {
	Post.findOneAndRemove({ "header" : req.body.header }, function (err, results) {
		if (err) { console.log(err); res.redirect("../blog");}
		res.redirect("../blog")
	})
}


exports.previousBlogposts = function (req, res) {
	Post.find({}, function (err, results) {
		if (err) { console.log(err); res.redirect("../views/blog");}
		res.render("../views/blog", {blogposts : results})
	}).sort("-created").limit(10)
}
