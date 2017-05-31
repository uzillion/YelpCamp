var mongo = require("mongoose");

var campSchema = new mongo.Schema({
	name: String,
	image: String,
	desc: String,
	comments: [{
		type: mongo.Schema.Types.ObjectId,
		ref: "Comment"
	}]
});

module.exports = mongo.model("Camp", campSchema);