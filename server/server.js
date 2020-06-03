var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
const cors = require('cors');
var index = require("./routes/index");
var bookings = require("./routes/bookings");
var accepted = require("./routes/accepted")

var app = express();
var port = 3000;

app.listen(port, function(){
    console.log("server is listening on port ",port);
});


//views

app.set("views",  path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);


//Body parser MW

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());
//Routes

app.use("/", index);
app.use("/api", bookings);
app.use("/api",accepted);
// app.use("/api", driverLocation);
// app.use("/api", drivers);
