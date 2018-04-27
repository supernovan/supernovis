var Post = require("../models/postmodel")
var Id = require("../models/idmodel")


function retrieveCounter (callback) {
	
}


exports.postblog = async (req, res, next) => {
	if (req.body.header && req.body.text) {
		
		let counter = await Id.findOne({name : "autoinc"}, {upsert: true, setDefaultsOnInsert: true, new: true}, function (err, ele) {
			if (err) {
				return null
			} else {
				return ele
			}
		})

		console.log(counter.blogid)
		if (counter.blogid === undefined) {
			var count = {
				blogid: 1,
				postid: 1,
				name: "autoinc"
			}
			counter = await Id.create(count, {new: true}, function (err, ele) {
				if (err) {
					console.log("could not create it")
					next(err)
				} else {
					console.log("counter is a thing now")
					return ele
				}
			})
		}

		await console.log("counter" + counter + " : " + counter.blogid)

		var blogpost = await {
			//This should be fixed if I ever get more people that can blog
			author: "Supernovan",
			header: req.body.header,
			text: req.body.text,
			created: Date.now(),
			id: counter.blogid++
		}


		
		// console.log(blogpost.author + " : " + blogpost.header + " : " + blogpost.text + " : " + blogpost.created)
		await Post.create(blogpost, function (err, user) {
			if (err) {
				console.log(blogpost)
				console.log("it failed")
				next(err)
			} else {
				console.log("blogpost created")
				res.redirect("/blog")	
			}
		})
	}
}

exports.updateblog = function (req, res, next) {
	if (req.body.id && req.body.text) {
		Post.findOne({"id" : req.body.id},function (err, post) {
			if (err) {
				console.log("could not find it")
			} else {
				p.updated = Date.now()
				p.text = req.body.text
				p.save(function(err) {
					if (err) {
						console.log("Could not save blogpost")
					} else {
						console.log("wehej")
					}
				})
				res.redirect("/blog")
			}
		})
	}	else {
		console.log(req.body.id + " : " + req.body.text)
		res.redirect("/blog")
	}	// console.log(blogpost.author + " : " + blogpost.header + " : " + blogpost.text + " : " + blogpost.created)
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
	Post.findOneAndRemove({ "id" : req.body.id }, function (err, results) {
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
