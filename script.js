// Firebase config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const inventory = [
  {id: 'sword1', name: 'Cyber Blade', type: 'Melee', rarity: 'Rare', price: 100, img: 'images/sword1.png'},
  {id: 'sword2', name: 'Neon Saber', type: 'Melee', rarity: 'Rare', price: 120, img: 'images/sword2.png'},
  // add all other items here
];

const playerNameInput = document.getElementById('playerName');
const inventoryGrid = document.getElementById('inventoryGrid');

function renderInventory() {
  inventoryGrid.innerHTML = '';
  inventory.forEach(item => {
    const card = document.createElement('div');
    card.className = 'item-card';
    const bought = sessionStorage.getItem(item.id) === 'true';
    card.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p>Type: ${item.type}</p>
      <p>Rarity: ${item.rarity}</p>
      <p>Price: ${item.price}</p>
      <button class="buy-btn" ${bought ? 'disabled' : ''}>${bought ? 'Purchased' : 'Buy'}</button>
    `;
    const btn = card.querySelector('.buy-btn');
    btn.addEventListener('click', () => buyItem(item.id));
    inventoryGrid.appendChild(card);
  });
}

function buyItem(itemId) {
  const player = playerNameInput.value.trim();
  if (!player) { alert('Enter your name first'); return; }
  firebase.database().ref('players/' + player + '/items/' + itemId).set(true);
  sessionStorage.setItem(itemId, 'true');
  renderInventory();
}

// Load items already purchased
playerNameInput.addEventListener('change', () => {
  const player = playerNameInput.value.trim();
  if (!player) return;
  firebase.database().ref('players/' + player + '/items').once('value', snapshot => {
    snapshot.forEach(child => sessionStorage.setItem(child.key, 'true'));
    renderInventory();
  });
});

renderInventory();
