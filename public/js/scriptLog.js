const usernameField = document.querySelector('#username');  
const signUpSubmit = document.querySelector('#signUpSubmit');
const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#confirmPassword');

const messageContainer = document.querySelector('.messageContainer');
const queryString = window.location.search;

if (queryString == '?incorrectLogin') {
    messageContainer.innerHTML = `<div class="msguser">Incorrect Username or Password!</div>`;
}