var exp 		= require("express"),
	router 		= exp.Router(),
	passport	= require("passport"),
	User		= require("../models/users");


function isLoggedIn(req, res, next) {
	if(req.isAuthenticated())
		return next();
	res.redirect("/login");
}

router.get("/", function(req, res) {
	res.redirect("/camps");
});

router.get("/login", function(req, res) {
	res.render("login");
});

router.post("/login", passport.authenticate("local", {
	successRedirect: "/camps",
	failureRedirect: "/login"
}), function(req, res){});

router.get("/register", function(req, res) {
	res.render("register");
});

router.post("/register", function(req, res) {
	User.register(new User({username: req.body.username}), req.body.password, function(err, user) {
		if(err) {
			console.log(err);
			return res.send("<h1 style='color: red, margin-left: 30px'>Registration Failed</h1>");
		}
		passport.authenticate("local")(req, res, function() {
			res.redirect("/camps");
		});
	});
});


router.get("/logout", function(req, res) {
	req.logout();
	res.redirect("/camps");
});

module.exports = router;