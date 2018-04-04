var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'passwort',
  database: 'ausgaben'
});
connection.connect();
var values = {
  Datum: '2018-04-04',
  Art: '6',
  Kommentar: 'Tandem',
  Euro: '7.95'
};
connection.query('INSERT INTO ausgaben SET ?', values, function(err, result) {
  if (err) throw err;
  console.log(result);
  connection.end();
});
