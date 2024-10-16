import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getDatabase, ref, push, get } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyD3Mm6elpeVelrUCpGIZ0mn3W1V5_Cmv00",
  authDomain: "anokhanames.firebaseapp.com",
  projectId: "anokhanames",
  storageBucket: "anokhanames.appspot.com",
  messagingSenderId: "836047514814",
  appId: "1:836047514814:web:9f467c5fb11f5e251d82ef",
  measurementId: "G-6N779HR6T9"
  };


const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

const sendDataButton = document.getElementById("sendData");
sendDataButton.addEventListener("click", submitForm);

const nameInput = document.getElementById("register-username");


function submitForm() {

  const nameValue = nameInput.value;


  const feedbackRef = ref(database, 'Users');
  push(feedbackRef, {
    name: nameValue,
  }).then(() => {

    alert("User loggedin!");

  }).catch((error) => {

    alert("Error recording responses: " + error.message);
  });


  nameInput.value = '';
}