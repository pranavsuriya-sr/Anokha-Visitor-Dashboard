import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getDatabase, ref, push, get } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAzI6dxsYXbgk9y9TPk_D3go5TACID9gnM",
  authDomain: "anokhanames-feee5.firebaseapp.com",
  projectId: "anokhanames-feee5",
  storageBucket: "anokhanames-feee5.appspot.com",
  messagingSenderId: "351552017796",
  appId: "1:351552017796:web:1278bcb174d00f18b4b9d1",
  measurementId: "G-GH14Q0X6JV"
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
