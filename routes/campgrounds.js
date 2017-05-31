var exp 		= require("express"),
	router 		= exp.Router(),
	Camp		= require("../models/campgrounds"),
	middleware 	= require("../middleware");

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
router.get("/new", middleware.isLoggedIn, function(req, res) {
	res.render("campgrounds/newc");
});

//New camp post route
router.post("/", middleware.isLoggedIn, function(req, res) {
	Camp.create(req.body.camp, function(err, camp) {
		if(err) {
			console.log(err);
		} else {
			camp.user = req.user._id;
			camp.save();
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

router.get("/:id/edit", middleware.isLoggedIn, function(req, res) {
	Camp.findById(req.params.id, function(err, camp) {
		if(err) {
			console.log(err);
		} else {
			res.render("campgrounds/edit", {camp:camp});
		}
	});
});

module.exports = router;