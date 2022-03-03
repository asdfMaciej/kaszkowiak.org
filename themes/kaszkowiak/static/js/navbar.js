// init lightbox for images
const lightbox = GLightbox({});

// change navbar class on scroll, when an element #navbar-transparent exists
const navbar = document.querySelector('.navbar');
function checkScroll() {
	if (window.scrollY >= 200) {
        navbar.classList.add('navbar--active');
    } else {
        navbar.classList.remove('navbar--active');
    }
}

if (document.querySelector("#navbar-transparent")) {
	document.addEventListener('scroll', checkScroll, {capture: true, passive: true});
	checkScroll();
} else {
	navbar.classList.add("navbar--active");
}

const navbarHamburger = document.querySelector("#nav-hamburger");
const navbarList = document.querySelector(".navbar__navigation"); 
navbarHamburger.onclick = function() {
	if (document.querySelector("#navbar-transparent")) {
		if (window.scrollY < 200) {
			navbar.classList.toggle('navbar--active');
		}
	}

	navbarList.classList.toggle("navbar__navigation--shown");
	return false;
}