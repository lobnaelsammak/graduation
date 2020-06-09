var express = require("express");
var router = express.Router();
var mongojs =  require("mongojs");
var mongoose = require("mongoose");


var db = mongojs("mongodb+srv://lobna:lobna@gradproj-elh8e.mongodb.net/Requests",["activeRequests"]);
mongoose.set('useFindAndModify', false);

var mySchema = mongoose.Schema({
	
	roomNumber : String,
	requestType : String,
	timestamp: Date,
  });

 var active = mongoose.model("active", mySchema, "activeRequests");

 mongoose.connect("mongodb+srv://lobna:lobna@gradproj-elh8e.mongodb.net/Requests", {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

var db1 = mongoose.connection;

db1.on("error", console.error.bind(console, "connection error:"));


router.delete('/activeRequests/:id', function(req,res){
	var id = req.params.id.substring(6,100);
	console.log(id);
	console.log("ana hena");
	active.findOneAndRemove({_id:id},function(error){
		if(error){
			 console.log(error);
			 return res.status(500).send();
		}
		console.log("done");
		return res.status(200).send();
	});
});

db1.once("open", function() {
  console.log("Connection Successful to active Requests!");
});

router.get("/activeRequests", function(req, res, next){
	db.activeRequests.find(function(err, activeRequests){
		if(err){
			res.send(err);

		}
		res.json(activeRequests);
	})
}); 
 


router.get("/activeRequests", function(req, res, next){
	res.send("BOOKINGS ROUTE");
}); 




module.exports = router;