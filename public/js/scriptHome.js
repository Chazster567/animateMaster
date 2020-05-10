//animates nav elements
function addPulse(e){
  this.classList.add('animated', 'pulse');
}

function removePulse(e){
  this.classList.remove('animated', 'pulse');
}

//calls animation on mouse hover for logo
const navBrand = document.querySelector('.navbar-brand');
navBrand.addEventListener('mouseenter', addPulse);
navBrand.addEventListener('animationend', removePulse);

//calls animation on mouse hover for links
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

//locates the two boxes with the class of nameContainer
const petContainer = document.querySelector('.petContainer');
const reminderContainer = document.querySelector('.reminderContainer');
const petString = window.location.search;
const reminderString = window.location.search;

//text response to notify user of succesful save
if (petString == '?petSaved') {
  petContainer.innerHTML = `<div>Pet Saved!</div>`;
}

if (reminderString == '?reminderSaved') {
  reminderContainer.innerHTML = `<div>Reminder Saved!</div>`;
}

//fades preloader out after assets have loaded
$(window).on('load', function() {
	$(".loader").delay(2000).fadeOut("slow");
  $("#overlayer").delay(2000).fadeOut("slow");
})