var express = require("express");
var router = express.Router();
var mongojs =  require("mongojs");

var db = mongojs("mongodb+srv://lobna:lobna@gradproj-elh8e.mongodb.net/Mydatabase",["Mycollection"]);

router.get("/Mycollection", function(req, res, next){
	db.Mycollection.find(function(err, Mycollection){
		if(err){
			res.send(err);

		}
		res.json(Mycollection);
	})
}); 

router.get("/Mycollection", function(req, res, next){
	res.send("BOOKINGS ROUTE");
}); 

module.exports = router;