var mongoose = require("mongoose")
var Schema = mongoose.Schema

var PostSchema = new Schema({
	author: {
		type: String,
		required: true,
		trim: true
	},
	header: {
		type: String,
		required: true
	},
	text: {
		type: String,
		required: true
	},
	created: {
		type: Date,
		required: true
	},

	uppdated: {
		type: Date,

	}

})


var Post = mongoose.model("Post", PostSchema)
module.exports = Post