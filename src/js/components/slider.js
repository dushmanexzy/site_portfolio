import Swiper, { Navigation, Pagination} from 'swiper';
import vars from '../_vars';

Swiper.use([Navigation, Pagination]);

const worksSlider = new Swiper(vars.$worksSlider, {
  spaceBetween: 30,
  slidesPerView: 3,
  loop: true,

  navigation: {
    prevEl: '.swiper-button-prev',
    nextEl: '.swiper-button-next',
  },
});
