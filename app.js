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
app.listen(7555, () => {
  console.log('Server running on http://localhost:7555');
});
