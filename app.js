const express = require('express');
const bodyParser = require('body-parser');
const store = require('./store');
const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());
app.post('/buchen', (req, res) => {
  store
    .buchen({
      datum: req.body.datum,
      art: req.body.art,
      kommentar: req.body.kommentar,
      euro: req.body.euro.replace(/,/g, '.')
    })
    .then(() => res.sendStatus(200));
});
app.get('/select', function(req, res) {
  var mysql = require('mysql');
  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'passwort',
    database: 'ausgaben'
  });
  connection.connect();
  connection.query('SELECT * FROM ausgaben_art ORDER BY bezeichnung', function(
    err,
    rows,
    fields
  ) {
    connection.end();
    if (err) throw err;
    res.json(rows);
  });
});
app.listen(7555, () => {
  console.log('Server running on http://localhost:7555');
});
