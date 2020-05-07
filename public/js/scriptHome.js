//animates nav elements
function addPulse(e){
  this.classList.add('animated', 'pulse');
}

function removePulse(e){
  this.classList.remove('animated', 'pulse');
}

//calls animation on mouse hover
const navBrand = document.querySelector('.navbar-brand');
navBrand.addEventListener('mouseenter', addPulse);
navBrand.addEventListener('animationend', removePulse);

const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(navLink => navLink.addEventListener('mouseenter', addPulse));
navLinks.forEach(navLink => navLink.addEventListener('animationend', removePulse));

//function for adding shadow to navbar when scrolling
$(function () {
  $(document).scroll(function () {
    var $nav = $(".sticky-top");
    $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
  });
});

const messageContainer = document.querySelector('.messageContainer');
const queryString = window.location.search;

if (queryString == '?petSaved') {
    messageContainer.innerHTML = `<div>Pet Saved!</div>`;
}

if (queryString == '?reminderSaved') {
  messageContainer2.innerHTML = `<div>Reminder Saved!</div>`;
}

$(window).on('load', function() {
	$(".loader").delay(2000).fadeOut("slow");
  $("#overlayer").delay(2000).fadeOut("slow");
})