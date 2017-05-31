var exp 			= require("express"),
	mongo 			= require("mongoose"),
	bP 				= require("body-parser"),
	passport		= require("passport"),
	local			= require("passport-local"),
	passLocalMongo	= require("passport-local-mongoose"),
	expSession		= require("express-session"),
	Camp 			= require("./models/campgrounds"),
	Comment 		= require("./models/comments"),
	User			= require("./models/users"),
	campRoute		= require("./routes/campgrounds"),
	commentRoute	= require("./routes/comments"),
	indexRoute		= require("./routes/index");

mongo.connect("mongodb://localhost/yelp_camp");

var app = exp();

app.use(bP.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(exp.static(__dirname + "/public"));

//Authentication
app.use(expSession({
	secret: "I feel it coming",
	resave: false,
	saveUninitialized:  false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
	res.locals.user = req.user;
	next();
});

passport.use(new local(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Routes
app.use("/camps", campRoute);
app.use("/camps/:id", commentRoute);
app.use(indexRoute);

app.listen(process.env.PORT || 3000, process.env.IP, function() {
	console.log("Server Started\\|/");
});