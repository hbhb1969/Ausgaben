const Buchen = document.querySelector('.Buchen');
Buchen.addEventListener('submit', (e) => {
  e.preventDefault();
  const datum = Buchen.querySelector('.datum').value;
  const art = Buchen.querySelector('.art').value;
  const kommentar = Buchen.querySelector('.kommentar').value;
  const euro = Buchen.querySelector('.euro').value;
  post('/buchen', { datum, art, kommentar, euro });
  Buchen.querySelector('.art').value = '';
  Buchen.querySelector('.kommentar').value = '';
  Buchen.querySelector('.euro').value = '';
  Buchen.querySelector('.art').focus();
});

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
