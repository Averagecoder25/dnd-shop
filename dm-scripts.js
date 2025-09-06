firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const restockDiv = document.getElementById('restockButtons');

inventory.forEach(item => {
  const btn = document.createElement('button');
  btn.innerText = 'Restock ' + item.name;
  btn.addEventListener('click', () => {
    db.ref('players').remove();
    sessionStorage.clear();
    alert('All items restocked for all players!');
  });
  restockDiv.appendChild(btn);
});
