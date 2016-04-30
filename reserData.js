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

connection.query('SELECT * FROM Reservation',function(err,res){
	$('#waitlistSection').html(res[0].name);
})