// import './vendor/focus-visible.min.js';
import vars from './_vars';
import './components/slider';
import {scrollTo} from './functions/smooth-scroll';
// import {resizeContent} from './functions/resize';
// import {disableScroll, enableScroll} from './functions/stop-scroll';

vars.$ahchorLinks.forEach((el) => {
	el.addEventListener('click', (e) => {
		e.preventDefault();

		let id = e.currentTarget.getAttribute('href');

		scrollTo(document.querySelector(id))
	});
});
