var Table = require("../models/trellotable")
var Card = require("../models/trellocard")

exports.createTable = async (req, res, next) => {
	console.log("Do you even create?")
	console.log(req.body)

	if (req.body.title) {
		let title = req.body.title
		let pos   = req.body.pos
		let table = {
			title: title,
			position: pos
		}
		console.log(table)

		await Table.create(table, function (err, newTable) {
			if (err) {
				console.error("Could not create new table")
				next()
			} else {
				console.log("Created a new table")
			}
		})
		await Table.find({}, function (err, results) {
		if (err) { console.log(err); res.redirect("/");}
		console.log(results.map(r => [r.title, r.position]))
		io.emit("updateTables", results.map(r => [r.title, r.position]))
		}).limit(20)
	}
}

exports.deleteTable = async (req, res, next) => {
	if (req.body.title) {
		let title = req.body.title

		await Table.findOneAndRemove({"title" : title}, function (err, result) {
			if (err) { 
				console.error(err)
				next()
			} else {
				console.log("Removed table with title: " + title)
			}
		})

		await Table.find({}, function (err, results) {
		if (err) { console.log(err); res.redirect("/");}
		
		io.emit("updateTables", results.map(r => [r.title, r.position]))
		}).limit(20)
	}
}

exports.tablesForPage = function (req, res) {
	let str = req.originalUrl
	if (str.split("/").length > 1) {
		str = str.split("/")
		str = str[str.length-1]
	}
	res.render(str)
}

exports.getTable = function (callback) {
	console.log("damn")
	Table.find({}, function (err, result) {
		if (err) return null;
		console.log("grill")
		callback(result.map(r => [r.title, r.position]))
	})
}