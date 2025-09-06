const firebaseConfig = {
  apiKey: "AIzaSyBUTT9IKCBU9iN_nxy0jbV3nVvH-qAqeIo",
  authDomain: "dmd-store-8b03d.firebaseapp.com",
  databaseURL: "https://dmd-store-8b03d-default-rtdb.firebaseio.com/",
  projectId: "dmd-store-8b03d",
  storageBucket: "dmd-store-8b03d.firebasestorage.app",
  messagingSenderId: "711196890755",
  appId: "1:711196890755:web:aaf9f73e3de4e284e0edb6",
  measurementId: "G-5BBBD3H6TQ"
};

//Initialize Firebase
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
