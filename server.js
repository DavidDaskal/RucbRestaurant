// Dependencies
// ===========================================================
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var PORT = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));


var mysql = require("mysql");

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'reservations'
});

connection.connect(function(err){
	if (err) {
		console.log(err);
	}
	else {
		console.log('connection is good');
	}
});

// Routes
// ===========================================================
app.get('/', function (req, res, next) {


res.sendFile(__dirname+"/index.html");


});

app.get('/makereserv.html', function(req, res){



res.sendFile(__dirname+"/makereserv.html");

})



app.post('/submitRes', function(req, res){

console.log(req.body.reserve_name);


/// With our post variable insert into the tables or use those as select items from the tables

var insertData = {customer_name: req.body.reserve_name, customer_email: req.body.reserve_email, phone_number: req.body.reserve_phone};


	
 connection.query('SELECT COUNT(*) FROM reservations',function(err,res){

 	var currentCount = (res[0]['COUNT(*)']);
 	console.log(currentCount);

   if (currentCount < 5) {

	connection.query("INSERT INTO reservations SET ?", insertData, function(err, result){
 	
 	});

 	 }

  else {

     connection.query("INSERT INTO waitlist SET ?", insertData, function(err, result){


 		 });
 	}


});

res.redirect("/");

});








 










// Listener
// ===========================================================
app.listen(PORT, function(){
	console.log('App listening on PORT ' + PORT);
})