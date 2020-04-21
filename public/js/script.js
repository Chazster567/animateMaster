const usernameField = document.querySelector('#username');  
const signUpSubmit = document.querySelector('#signUpSubmit');

signUpSubmit.addEventListener('click', (e) => {
    if(usernameField.value === '') {
        e.preventDefault();
        window.alert('Form requires Username');
    }
})

function addPulse(e){
  this.classList.add('animated', 'pulse');
}

function removePulse(e){
  this.classList.remove('animated', 'pulse');
}

//const navBrand = document.querySelector('.navbar-brand');
//navBrand.addEventListener('mouseenter', addPulse);
//navBrand.addEventListener('animationend', removePulse);

//const navLinks = document.querySelectorAll('.nav-link');
//navLinks.forEach(navLink => navLink.addEventListener('mouseenter', addPulse));
//navLinks.forEach(navLink => navLink.addEventListener('animationend', removePulse));

//const usernameField = document.querySelector('#username');  
//const signUpSubmit = document.querySelector('#signUpSubmit');

//$(function () {
//  $(document).scroll(function () {
//    var $nav = $(".sticky-top");
//    $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
//  });
//});

