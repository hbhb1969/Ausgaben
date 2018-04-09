const buchen = document.querySelector('.buchen');
const gesamtausgaben = document.querySelector('#gesamtausgaben');
buchen.addEventListener('submit', (e) => {
  e.preventDefault();
  const datum = buchen.querySelector('.datum').value;
  const art = buchen.querySelector('.art').value;
  const kommentar = buchen.querySelector('.kommentar').value;
  const euro = buchen.querySelector('.euro').value;
  post('/buchen', {
    datum,
    art,
    kommentar,
    euro
  });
  art.value = '';
  kommentar.value = '';
  euro.value = '';
  buchen.querySelector('.art').focus();

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