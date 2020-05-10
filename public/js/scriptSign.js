//searches for objects with specified ids
const usernameField = document.querySelector('#username');  
const signUpSubmit = document.querySelector('#signUpSubmit');
const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#confirmPassword');

//returns error messages for blank fields or passwords that dont match
signUpSubmit.addEventListener('click', (e) => {
    if(usernameField.value === '') {
        e.preventDefault();
        window.alert('Form requires Username');
    }
    if(password.value != confirmPassword.value) {
        e.preventDefault();
        window.alert('Passwords do not match');
    }
});