const express = require('express');
const bodyParser = require('body-parser');
const insert = require('./db/insert');
const pool = require('./db/pool');
const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());
app.post('/buchen', (req, res) => {
  insert
    .insert({
      datum: req.body.datum,
      art: req.body.art,
      kommentar: req.body.kommentar,
      euro: req.body.euro.replace(/,/g, '.')
    })
    .then(() => res.sendStatus(200));
});
// Route zum Füllen eines Select Feldes
app.get('/select', (req, res) => {
  pool.query(
    'SELECT * FROM ausgaben_art ORDER BY bezeichnung',
    (err, rows, fields) => {
      if (err) throw err;
      res.json(rows); // response = Abfrageergebnis im JSON-Format -> wird in der der HTML-Seite per fetch abgerufen
    }
  );
});
app.listen(7555, () => {
  console.log('Server running on http://localhost:7555');
});
