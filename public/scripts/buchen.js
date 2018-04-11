const buchen = document.querySelector('.buchen');
const gesamtausgaben = document.querySelector('#gesamtausgaben');

buchen.addEventListener('submit', (e) => {
  e.preventDefault();

  const datum = buchen.querySelector('.datum').value;
  const art = buchen.querySelector('.art').value;
  const kommentar = buchen.querySelector('.kommentar').value;
  const euro = buchen.querySelector('.euro').value;

  // schickt die Daten an die Adresse /buchen, wo sie in der app.js in den INSERT-Befehl eingefügt werden
  post('/buchen', {
      datum,
      art,
      kommentar,
      euro
    })
    .then(berechneGesamt());;

  // Formular aufräumen
  buchen.querySelector('.art').value = ''; //art =''; klappt merkwürdigerweise nicht
  buchen.querySelector('.kommentar').value = '';
  buchen.querySelector('.euro').value = '';
  buchen.querySelector('.art').focus();

  // Buchungskontrolle
  // setTimeout("berechneGesamt()", 1000); // Ohne Timeout ist die Abfrage schneller als die Buchung mit post
});

function post(path, data) {
  return window.fetch(path, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}

function berechneGesamt() {
  var ausgabenGesamt = 0;
  fetch('http://localhost:7555/select-ausgaben-gesamt/')
    .then(function(response) {
      if (response.ok) {
        return response.json();
      }
    })
    .then(function(json) {
      for (let row of json) {
        ausgabenGesamt += row.Euro;
      }
      gesamtausgaben.innerHTML = ausgabenGesamt;
    })
    .catch(console.log);
}