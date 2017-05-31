var mongo = require("mongoose");

var commentSchema = new mongo.Schema({
	author: String,
	comment: String,
});

module.exports = mongo.model("Comment", commentSchema);