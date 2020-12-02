import vars from '../_vars';

const scrollTo = (element) => {
	window.scroll({
		behavior: 'smooth',
		left: 0,
		top: element.offsetTop // - document.querySelector('.nav').clientHeight,
	});
}

vars.$ahchorLinks.forEach((el) => {
	el.addEventListener('click', (e) => {
		e.preventDefault();

		let id = e.currentTarget.getAttribute('href');

		scrollTo(document.querySelector(id))
	});
})

// usage

// anchors.forEach((el) => {
// 	el.addEventListener('click', (e) => {
// 		e.preventDefault();

// 		let id = e.currentTarget.getAttribute('href');

// 		scrollTo(document.querySelector(id))
// 	});
// });
