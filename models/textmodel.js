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
	id: {
		type: Number
	}
})


var Text = mongoose.model("Text", TextSchema)
module.exports = Text