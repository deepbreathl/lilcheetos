// User data could be stored in a real database, for demonstration using local storage
let users = JSON.parse(localStorage.getItem('users')) || [];
let state=0

function register() {
  const username = document.getElementById('registerUsername').value;
  const password = document.getElementById('registerPassword').value;
  if (users.some(user => user.username === username)) {
    alert('Username already exists.');
    return;
  }
  users.push({ username, password });
  localStorage.setItem('users', JSON.stringify(users));
  alert('Registration successful!');
  switchToLogin();
}

function login() {
  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPassword').value;
  const userExists = users.some(user => user.username === username && user.password === password);
  if (userExists) {
    document.getElementById('login').classList.add('hidden');
    document.getElementById('home').classList.remove('hidden');
  } else {
    alert('Invalid credentials or user does not exist.');
  }
}

function logout() {
  document.getElementById('home').classList.add('hidden');
  document.getElementById('login').classList.remove('hidden');
}

function switchToRegister() {
  document.getElementById('login').classList.add('hidden');
  document.getElementById('registration').classList.remove('hidden');
}

function switchToLogin() {
  document.getElementById('registration').classList.add('hidden');
  document.getElementById('login').classList.remove('hidden');
}
document.addEventListener('DOMContentLoaded', (event) => {
  document.getElementById('musicButton').addEventListener('click', goToRoomSelection);
});
document.addEventListener('DOMContentLoaded', (event) => {
  document.getElementById('sportButton').addEventListener('click', goToSportSelection);
});

let selectedRoom = null;
let selectedTime = null;
// Initialize the navigation to the room selection from the Music button
function goToRoomSelection() {
  document.getElementById('home').classList.add('hidden');
  document.getElementById('roomSelection').classList.remove('hidden');
}
function selectRoom(room) {
  selectedRoom = room;
  document.getElementById('roomSelection').classList.add('hidden');
  document.getElementById('timeSelection'+room).classList.remove('hidden');
}

function selectTime(time) {
  selectedTime = time;
  document.getElementById('timeSelection'+selectedRoom).classList.add('hidden');
  if (state ==0){
    document.getElementById('confirmation').classList.remove('hidden');
  }
  else {
    document.getElementById('cancelation').classList.remove('hidden');
  }
  
}

function checkReservation(){
  if (state ==0){
    confirmReservation()
  }
  else {
    cancelReservation()
  }
}
function confirmReservation() {
  state=1
  // Implement reservation logic, such as updating the database
  alert(`Room ${selectedRoom} reserved for ${selectedTime}.`);
  // Then navigate to a confirmation page or back to home
  document.getElementById('confirmation').classList.add('hidden');
  document.getElementById('home').classList.remove('hidden');

  updateButtonStateReserved()
}
function updateButtonStateReserved(){
  const  updatebutton= document.getElementById('updatebutton'+selectedRoom+selectedTime);
  document.getElementById('updatebutton'+selectedRoom+selectedTime).classList.add('reserved');
}
function cancelReservation(){
  state=0
  // Implement reservation logic, such as updating the database
  alert(`Reservation canceled`);
  // Then navigate to a confirmation page or back to home
  document.getElementById('cancelation').classList.add('hidden');
  document.getElementById('home').classList.remove('hidden');
  updateButtonStateCancel()
}
function updateButtonStateCancel(){
  const  updatebutton= document.getElementById('updatebutton'+selectedRoom+selectedTime);
  document.getElementById('updatebutton'+selectedRoom+selectedTime).classList.remove('reserved');
}

function goBack() {
  // Implement logic to go back to the previous page
  // For simplicity, this example just goes back to the home page
  document.querySelectorAll('.page').forEach(page => page.classList.add('hidden'));
  document.getElementById('home').classList.remove('hidden');
}

function goToSportSelection() {
  document.getElementById('home').classList.add('hidden');
  document.getElementById('sportSelection').classList.remove('hidden');
}
function notfound(){
  alert('ยังไม่ได้ทำ แงๆ')
}




