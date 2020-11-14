import Swiper, { Navigation, Pagination} from 'swiper';
import vars from '../_vars';

Swiper.use([Navigation, Pagination]);

const worksSlider = new Swiper(vars.$worksSlider, {
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
    320: {
      slidesPerView: 1,
      spaceBetween: 0,
    },
    1023: {
      slidesPerView: 2,
      spaceBetween: 36,
    },
    1200: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
  },
});
