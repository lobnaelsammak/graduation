var express = require("express");
var router = express.Router();
var mongojs =  require("mongojs");

var db = mongojs("mongodb+srv://lobna:lobna@gradproj-elh8e.mongodb.net/app",["bookings"]);

router.get("/bookings", function(req, res, next){
	db.bookings.find(function(err, bookings){
		if(err){
			res.send(err);

		}
		res.json(bookings);
	})
}); 

router.get("/bookings", function(req, res, next){
	res.send("BOOKINGS ROUTE");
}); 

module.exports = router;