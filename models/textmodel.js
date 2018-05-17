var mongoose = require("mongoose")
var Schema = mongoose.Schema

var TextSchema = new Schema({
	header: {
		type: String,
		required: true
	},
	text: {
		type: String,
		required: true
	},
	textid: {
		type: Number,
		required: true,
		unique: true
	},
	tag: {
		type: String,
		required: true
	}
})


var Text = mongoose.model("Text", TextSchema)
module.exports = Text