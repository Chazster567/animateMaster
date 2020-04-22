const usernameField = document.querySelector('#username');  
const signUpSubmit = document.querySelector('#signUpSubmit');

signUpSubmit.addEventListener('click', (e) => {
    if(usernameField.value === '') {
        e.preventDefault();
        window.alert('Form requires Username');
    }
})