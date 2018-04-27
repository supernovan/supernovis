var mongoose = require("mongoose")
var Schema = mongoose.Schema

var IdSchema = new Schema({
	blogid : {
		type: Number,
		default: 1,
		upsert: true
	},

	postid : {
		type: Number,
		default: 1,
		upsert: true
	},
	name: {
		type: String,
		default: "autoinc",
		upsert: true
	}
})


var Id = mongoose.model("Id", IdSchema)
module.exports = Id