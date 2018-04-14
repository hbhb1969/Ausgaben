const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./db/pool');
const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());

// Route zum Speichern der Daten eines Select-Feldes
app.get('/select-ausgaben-art', (req, res) => {
  pool.query(
    'SELECT * FROM ausgaben_art ORDER BY bezeichnung',
    (err, rows, fields) => {
      if (err) throw err;
      res.json(rows); // response = Abfrageergebnis im JSON-Format -> wird in der der HTML-Seite per fetch abgerufen
    }
  );
});

// Liest die zu buchenden Daten aus der Query und schickt einen SQL-Befehl zur DB
app.post('/buchen', (req, res) => {
  var sql =
    "INSERT INTO ausgaben (datum, art, kommentar, euro) VALUES ('" +
    req.body.datum +
    "', '" +
    req.body.art +
    "', '" +
    req.body.kommentar +
    "', '" +
    req.body.euro +
    "')";
  pool.query(sql, (err, rows, fields) => {
    if (err) throw err;
    console.log('1. Gebucht: ' + req.body.art + ' - ' + req.body.euro + ' €');
    pool.query('SELECT * FROM ausgaben', (err, rows, fields) => {
      if (err) throw err;
      console.log('2. Abfrage');
      res.json(rows); // response = Abfrageergebnis im JSON-Format -> wird in der der HTML-Seite per fetch abgerufen
    });
  });
});

// Route zum Speichern der Gesamtausgaben, wird noch für die erste Abfrage benötigt
app.get('/select-ausgaben-gesamt', (req, res) => {
  pool.query('SELECT * FROM ausgaben', (err, rows, fields) => {
    if (err) throw err;
    res.json(rows); // response = Abfrageergebnis im JSON-Format -> wird in der der HTML-Seite per fetch abgerufen
  });
});
app.listen(7555, () => {
  console.log('Server running on http://localhost:7555');
});