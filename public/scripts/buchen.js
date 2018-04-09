const Buchen = document.querySelector('.Buchen');
var gesamt = document.getElementById(gesamtausgaben);
Buchen.addEventListener('submit', (e) => {
  e.preventDefault();
  const datum = Buchen.querySelector('.datum').value;
  const art = Buchen.querySelector('.art').value;
  const kommentar = Buchen.querySelector('.kommentar').value;
  const euro = Buchen.querySelector('.euro').value;
  post('/buchen', {
    datum,
    art,
    kommentar,
    euro
  });
  Buchen.querySelector('.art').value = '';
  Buchen.querySelector('.kommentar').value = '';
  Buchen.querySelector('.euro').value = '';
  Buchen.querySelector('.art').focus();

  setTimeout("berechneGesamt()", 1000); // Ohne Timeout ist die Abfrage schneller als die Buchung
});

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
      console.log(ausgabenGesamt);
      gesamtausgaben.innerHTML = ausgabenGesamt;
    })
    .catch(console.log);
}

function post(path, data) {
  return window.fetch(path, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
}