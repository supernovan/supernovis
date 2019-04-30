
var mongoose = require("mongoose")
var Schema = mongoose.Schema

var TrelloSchema = new Schema({
	title: {
		type: String,
		required: true,
		unique: true
	},
	position: {
		type: Number,
		required: true,
		unique: true
	}
})


var TrelloTable = mongoose.model("TrelloTable", TrelloSchema)
module.exports = TrelloTable