import Swiper, { Navigation, Pagination} from 'swiper';
import vars from '../_vars';

Swiper.use([Navigation, Pagination]);

const worksSlider = new Swiper(vars.$worksSlider, {
  spaceBetween: 36,
  slidesPerView: 2,
  loop: true,

  navigation: {
    prevEl: '.swiper-button-prev',
    nextEl: '.swiper-button-next',
  },

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  breakpoints: {
    1200: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
  },
});
