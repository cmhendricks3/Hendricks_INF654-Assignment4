// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
//import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";
import { getFirestore, collection, getDocs, addDoc, doc, deleteDoc, query, where, updateDoc } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2tF72NbRuvjaVcAmArAjMLdaGHrGRcpQ",
  authDomain: "restaurants-114a3.firebaseapp.com",
  projectId: "restaurants-114a3",
  storageBucket: "restaurants-114a3.appspot.com",
  messagingSenderId: "667369947369",
  appId: "1:667369947369:web:ab86ce8be26e2fa3213078",
  measurementId: "G-Q7RJ7E0382"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const db = getFirestore(app);

const restaurantList = document.querySelector('#restaurant-list');
const form = document.querySelector('#add-restaurant-form')

function renderRestaurant(dc) {
    let li = document.createElement("li");
    let name = document.createElement("span");
    let city = document.createElement("span");
    let cross = document.createElement('div');

    li.setAttribute('data-id', dc.id);
    name.textContent = dc.data().name;
    city.textContent = dc.data().city;
    cross.textContent = 'x';

    li.appendChild(name);
    li.appendChild(city);
    li.appendChild(cross);

    restaurantList.appendChild(li);

    //Delete listed restaurant
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        deleteDoc(doc(db, "restaurants", id))
    })


    
}

const restaurants = getDocs(collection(db, "restaurants")).then((snapshot) => {
    snapshot.forEach((doc) => {
        renderRestaurant(doc)
    })
})

const upDoc = doc(db, "restaurants", "VX0y1QZCbiLrUoCqBlPz");
updateDoc(upDoc, {
    city: "South Beloit",
    name: "Ana Maria's"
})

//Add entered restaurant name and city
form.addEventListener(('submit'), (e) => {
    e.preventDefault();
    const docRef = addDoc(collection(db, "restaurants"), {
        city: form.city.value,
        name: form.name.value
    })
    //renderRestaurant();
})
