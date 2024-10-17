import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";

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

// DOM Elements
const sendDataButton = document.getElementById("sendData");
const sendDataButtonabc = document.getElementById("sendDataabc");
const nameInput = document.getElementById("register-username");
const nameInputabc = document.getElementById("register-username-abc");
const totalEntriesElement = document.getElementById("totalEntries");
const scannedDataBody = document.getElementById("scannedDataBody");
const datePickerBtn = document.getElementById("datePickerBtn");
const selectedDateSpan = document.getElementById("selectedDate");
const currentDateP = document.getElementById("currentDate");

// State
let selectedDate = new Date();

// Event Listeners
sendDataButton.addEventListener("click", submitForm);
sendDataButtonabc.addEventListener("click", submitFormabc);
datePickerBtn.addEventListener("click", openDatePicker);

// Submit Form Function
function submitForm() {
  const rollNumber = nameInput.value.trim();
  if (!rollNumber) {
    alert("Please enter a valid roll number.");
    return;
  }

  const usersRef = ref(database, 'Users');
  push(usersRef, {
    rollNumber: rollNumber,
    timestamp: new Date().toISOString(),
    type: 'scanned'
  }).then(() => {
    nameInput.value = '';
  }).catch((error) => {
    alert("Error recording roll number: " + error.message);
  });
}

function submitFormabc() {
  const rollNumber = nameInputabc.value.trim();
  if (!rollNumber) {
    alert("Please enter a valid roll number.");
    return;
  }

  const usersRef = ref(database, 'Users');
  push(usersRef, {
    rollNumber: rollNumber,
    timestamp: new Date().toISOString(),
    type: 'manual'
  }).then(() => {
    nameInputabc.value = '';
  }).catch((error) => {
    alert("Error recording roll number: " + error.message);
  });
}

// Dashboard Functions
function initializeDashboard() {
  const usersRef = ref(database, 'Users');
  onValue(usersRef, (snapshot) => {
    const data = snapshot.val();
    updateDashboard(data);
  });
  updateDateDisplay();
}

function updateDashboard(data) {
  if (!data) return;

  const users = Object.values(data);
  const filteredUsers = users.filter(user => 
    isSameDay(new Date(user.timestamp), selectedDate)
  );

  totalEntriesElement.textContent = `Day 2 Total Entries: ${filteredUsers.length}`;

  // Clear existing rows
  scannedDataBody.innerHTML = '';

  // Add new rows
  filteredUsers.forEach((user) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td class="py-2 text-white">${user.rollNumber}</td>
      <td class="py-2 text-gray-300">${formatTimestamp(user.timestamp)}</td>
      <td class="py-2">
        <span class="px-2 py-1 rounded ${user.type === 'scanned' ? 'bg-green-900 text-green-300' : 'bg-blue-900 text-blue-300'}">
          ${user.type}
        </span>
      </td>
    `;
    scannedDataBody.appendChild(row);
  });
}

function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

function updateDateDisplay() {
  selectedDateSpan.textContent = formatDate(selectedDate);
  currentDateP.textContent = formatDate(selectedDate, true);
}

function formatDate(date, long = false) {
  const options = long 
    ? { year: 'numeric', month: 'long', day: 'numeric' }
    : { year: 'numeric', month: 'short', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

function openDatePicker() {
  const newDate = prompt('Enter date (YYYY-MM-DD):', formatDate(selectedDate).split(',')[0]);
  if (newDate) {
    const parsedDate = new Date(newDate);
    if (!isNaN(parsedDate.getTime())) {
      selectedDate = parsedDate;
      updateDateDisplay();
      updateDashboard(lastKnownData);
    } else {
      alert('Invalid date format');
    }
  }
}

function isSameDay(date1, date2) {
  return date1.getFullYear() === date2.getFullYear() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getDate() === date2.getDate();
}

// Initialize Dashboard
let lastKnownData = null;
initializeDashboard();

// Real-time updates
const usersRef = ref(database, 'Users');
onValue(usersRef, (snapshot) => {
  lastKnownData = snapshot.val();
  updateDashboard(lastKnownData);
});

// // Simulating real-time updates (for demonstration purposes)
// setInterval(() => {
//   push(usersRef, {
//     rollNumber: `2023${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
//     timestamp: new Date().toISOString(),
//     type: 'scanned'
//   });
// }, 5000);

const inputb = document.getElementById('register-username');
        const submitButton = document.getElementById('sendData');

        inputb.addEventListener('input', function() {
            if (inputb.value.length === 16) {
                // Automatically trigger form submission
                submitButton.click();
            }
        });