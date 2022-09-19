// init lightbox for images
if (typeof GLightbox !== 'undefined') {
	const lightbox = GLightbox({});
}

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

var offers = document.querySelectorAll(".offer-expanded h1");
var offerHeaders = document.querySelectorAll(".offer-list__headers a > h2");

function checkOfferScroll() {
	var lastPositive = null;
	for (const offer of offers) {
		const bottomOffset = window.innerHeight - offer.getBoundingClientRect().top - 16;
		if (bottomOffset > 0) {
			lastPositive = offer;
		} 
	}

	let index = 0;
	for (const offer of offers) {
		if (offer == lastPositive) {
			offerHeaders[index].classList.add("offer-expanded__title--active");
		} else {
			offerHeaders[index].classList.remove("offer-expanded__title--active");
		}

		index += 1;
	}
}

function checkOfferScrollCircles() {
	let offerSections = document.querySelectorAll(".offer__box-title");
	let scrollY = document.querySelector(".offer__scroll > div > svg").getBoundingClientRect().top + window.scrollY;

	let index = 0;
	let topIndex = 0;
	for (let element of offerSections) {
		let elementY = element.getBoundingClientRect().top + window.scrollY;

		if (scrollY >= elementY) {
			topIndex = index;
		}
		index += 1;
	}

	let circles = document.querySelectorAll(".offer__scroll > div > svg > circle");
	index = 0;
	circles.forEach((circle) => {
		if (index == topIndex) {
			circle.setAttribute("fill", "black");
		} else {
			circle.setAttribute("fill", "transparent");
		}
		index += 1;
	})
}

if (document.querySelector(".offer-list__headers")) {
	document.addEventListener('scroll', checkOfferScroll, {capture: true, passive: true});
	checkOfferScroll();
}

if (document.querySelector(".offer__scroll")) {
	document.addEventListener('scroll', checkOfferScrollCircles, {capture: true, passive: true});
	checkOfferScrollCircles();
}