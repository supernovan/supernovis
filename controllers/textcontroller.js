var Text = require("../models/textmodel")
var Id = require("../models/idmodel")



exports.createText = async (req, res, next) => {
	console.log(req.body.header + " : " + req.body.text + " : " + req.body.tag)
	if (req.body.header && req.body.text && req.body.tag) {
		
		let counter = await Id.findOneAndUpdate({name : "autoinc"}, { $inc: {postid: 1}}, function (err, ele) {
			if (err) {
				return null
			} else {
				return ele
			}
		})

		await console.log("counter" + counter + " : " + counter.postid)

		var textpost = await {
			//This should be fixed if I ever get more people that can blog
			header: req.body.header,
			text: req.body.text,
			tag: req.body.tag,
			textid: Math.floor(counter.postid/2) + 1
		}


		console.log(req.body.tag)
		// console.log(blogpost.author + " : " + blogpost.header + " : " + blogpost.text + " : " + blogpost.created)
		await Text.create(textpost, function (err, user) {
			if (err) {
				console.log(textpost)
				console.log("it failed")
				next(err)
			} else {
				console.log("textpost created")
				res.redirect("back")	
			}
		})
	}
}

exports.updateText = function (req, res, next) {
	if (req.body.id && req.body.text) {
		Text.findOne({"textid" : req.body.id},function (err, text) {
			if (err) {
				console.log("could not find it")
			} else {
				text.text = req.body.text
				text.save(function(err) {
					if (err) {
						console.log("Could not save blogpost")
					} else {
						console.log("wehej text updated")
					}
				})
				res.redirect("back")
			}
		})
	}	else {
		console.log(req.body.id + " : " + req.body.text)
		res.redirect("back")
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

exports.deleteText = function (req, res) {
	console.log("potatis")
	Text.findOneAndRemove({ "textid" : req.body.id }, function (err, result) {
		if (err) { console.log(err); res.redirect(req.url);}
		res.redirect("/")
	})
}


exports.textforpage = function (req, res) {
	let str = req.originalUrl
	if (str.split("/").length > 1) {
		str = str.split("/")
		str = str[str.length-1]
	}

	Text.find({tag: str}, function (err, results) {
		if (err) { console.log(err); res.redirect(req.originalUrl);}
		
		console.log(str)
		res.render(str, {texts : results})
	}).sort("-textid").limit(10)
}
