var mongo = require("mongoose");

var campSchema = new mongo.Schema({
	name: String,
	image: String,
	desc: String,
	user: {
		type: mongo.Schema.Types.ObjectId,
		ref: "User"
	},
	comments: [{
		type: mongo.Schema.Types.ObjectId,
		ref: "Comment"
	}]

});

module.exports = mongo.model("Camp", campSchema);