const navBrand = document.querySelector('.navbar-brand');
navBrand.addEventListener('mouseenter', addPulse);
navBrand.addEventListener('animationend', removePulse);

const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(navLink => navLink.addEventListener('mouseenter', addPulse));
navLinks.forEach(navLink => navLink.addEventListener('animationend', removePulse));

function addPulse(e){
  this.classList.add('animated', 'pulse');
}

function removePulse(e){
  this.classList.remove('animated', 'pulse');
}