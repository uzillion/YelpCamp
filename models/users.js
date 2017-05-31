var mongo 			= require("mongoose"),
	passLocalMongo 	= require("passport-local-mongoose");

var userSchema = new mongo.Schema({
	username: String,
	password: String,
	// camps: [{
	// 	type: mongo.Schema.Types.ObjectId,
	// 	ref: "Camp"
	// }]
});

userSchema.plugin(passLocalMongo);

module.exports = mongo.model("User", userSchema);