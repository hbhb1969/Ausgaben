const knex = require('knex')(require('./knexfile'));

module.exports = {
  buchen({ datum, art, kommentar, euro }) {
    console.log('buchen in store.js');
    return knex('ausgaben').insert({
      datum,
      art,
      kommentar,
      euro
    });
  }
};
