const knex = require('knex')(require('./knexfile'));

module.exports = {
  insert({ datum, art, kommentar, euro }) {
    console.log('buchen: ' + kommentar + ' Betrag: ' + euro + ' €');
    return knex('ausgaben').insert({
      datum,
      art,
      kommentar,
      euro
    });
  }
};