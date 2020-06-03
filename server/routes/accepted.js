var express = require("express");
var router = express.Router();
var mongojs =  require("mongojs");
var mongoose = require("mongoose");


var db1 = mongojs("mongodb+srv://lobna:lobna@gradproj-elh8e.mongodb.net/Mydatabase",["AcceptedRequests"])	

//CONNECTION TO DB
mongoose.connect("mongodb+srv://lobna:lobna@gradproj-elh8e.mongodb.net/Mydatabase", {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

//CREATING DB INSTANCE
var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function() {
  console.log("Connection Successful!");
});

var schema = mongoose.Schema({
	room : String,
	roomNumber : Number,
	timecalled : String,
	timeAccepted: Date,
  });
 var Model = mongoose.model("model", schema, "AcceptedRequests");

 let requests = [];

router.post('/AcceptedRequests', (req, res) => {
    const request = req.body;
	var doc1 = new Model({
		'room': request,
		'roomNumber' : request.roomNumber,
		'timecalled' : request.timestamp,
		'timeAccepted': Date.now() //Math.floor(Date.now() / 1000)
	});

	doc1.save(function(err, doc) {
		if (err) return console.error(err);
		console.log("Document inserted succussfully!");
	  });
    // Output the book to the console for debugging
    console.log(request);
    // requests.push(request);

    // res.send('Book is added to the database');
});
router.get("/AcceptedRequests", function(req, res, next){
	db1.AcceptedRequests.find(function(err, AcceptedRequests){
		if(err){
			res.send(err);

		}
		res.json(AcceptedRequests);
	})
}); 

// router.get('/AcceptedRequests', (req, res) => {

//     res.json(requests);
// });

module.exports = router;