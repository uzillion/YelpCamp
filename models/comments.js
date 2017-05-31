var mongo = require("mongoose");

var commentSchema = new mongo.Schema({
	comment: String,
	user: {
		type: mongo.Schema.Types.ObjectId,
		ref: "User"
	}
});

module.exports = mongo.model("Comment", commentSchema);