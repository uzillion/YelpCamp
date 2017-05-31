var exp 		= require("express"),
	router 		= exp.Router(),
	Camp		= require("../models/campgrounds");


function isLoggedIn(req, res, next) {
	if(req.isAuthenticated())
		return next();
	res.redirect("/login");
}


//Camps home route
router.get("/", function(req, res) {
	Camp.find({}, function(err, camps) {
		if(err) {
			console.log(err);
		} else {
			res.render("campgrounds/camps", {camps : camps});
		}
	});
});


//Camp creation route
router.get("/new", isLoggedIn, function(req, res) {
	res.render("campgrounds/newc");
});

//New camp post route
router.post("/", isLoggedIn, function(req, res) {
	Camp.create(req.body.camp, function(err, camp) {
		if(err) {
			console.log(err);
		} else {
			console.log(camp.name + " added!");
			res.redirect("/camps");
		}
	});
});


//Camp show route
router.get("/:id", function(req, res) {
	Camp.findById(req.params.id).populate("comments").exec(function(err, camp) {
		if(err) {
			console.log(err);
		} else {
			res.render("campgrounds/show", {camp:camp});
		}
	});
});

module.exports = router;