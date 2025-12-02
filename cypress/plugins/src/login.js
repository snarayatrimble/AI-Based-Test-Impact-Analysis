// src/login.js
const loginForm = document.getElementById('loginForm');
const usernameField = document.getElementById('username');
const passwordField = document.getElementById('password');
const errorMessage = document.getElementById('errorMessage');

function handleLogin(event) {
  event.preventDefault();
  const username = usernameField.value;
  const password = passwordField.value;
  if (username === 'testuser' && password === 'password') {
    alert('Login successfull!');
    window.location.href = '/dashboard';
  } else {
    errorMessage.textContent = 'Invalid username or password.';
    errorMessage.style.color = 'red';
  }
}

loginForm.addEventListener('submit', handleLogin);
