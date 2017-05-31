var exp 		= require("express"),
	router 		= exp.Router({mergeParams: true}),
	Camp		= require("../models/campgrounds"),
	Comment		= require("../models/comments");

function isLoggedIn(req, res, next) {
	if(req.isAuthenticated())
		return next();
	res.redirect("/login");
}


//Comments creation route
router.get("/new", isLoggedIn, function(req, res) {
	Camp.findById(req.params.id, function(err, camp) {
		if(err) {
			console.log(err);
		} else {
			res.render("comments/new", {camp: camp});
		}
	});
});


//Comments post route
router.post("/", isLoggedIn, function(req, res) {
	Camp.findById(req.params.id, function(err, camp) {
		if(err) {
			console.log(err);
		} else {
			Comment.create(req.body.comment, function(err, comment) {
				if(err) {
					console.log(err);
				} else {
					console.log(comment.author + "'s comment added!");
					camp.comments.push(comment);
					camp.save();
					res.redirect("/camps/"+req.params.id);
				}
			});
		}
	});
});

module.exports = router;