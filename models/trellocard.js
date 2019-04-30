
var mongoose = require("mongoose")
var Schema = mongoose.Schema

var TrelloSchema = new Schema({
	table: {
		type: String,
		required: true
	},
	title: {
		type: String,
		required: true,
		unique: true
	},
	text: {
		type: String,
	},
	users: {
		type: [[String]]
	}
})


var TrelloCard = mongoose.model("TrelloCard", TrelloSchema)
module.exports = TrelloCard