//searches for objects with specified ids
const usernameField = document.querySelector('#username');  
const signUpSubmit = document.querySelector('#signUpSubmit');
const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#confirmPassword');

//finds the message container from specified class
const messageContainer = document.querySelector('.messageContainer');
const queryString = window.location.search;

//returns error message for incorrect credentials
if (queryString == '?incorrectLogin') {
    messageContainer.innerHTML = `<div class="msguser">Incorrect Username or Password!</div>`;
}