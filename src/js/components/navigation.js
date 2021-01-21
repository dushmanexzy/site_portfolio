import vars from '../_vars';

const closeNavList = function () {
  vars.$header.classList.remove('menu-open');
}

vars.$window.addEventListener('DOMContentLoaded', () => {
  vars.$body.classList.remove('no-js');

  vars.$toggleNavBtn.addEventListener('click', (e) => {
    e.preventDefault();
    vars.$header.classList.toggle('menu-open');
  })

  vars.$body.addEventListener('click', (e) => {
    if (!vars.$header.contains(e.target)) {
      closeNavList();
    }

    if (e.target.classList.contains('js-anchor')) {
      closeNavList();
    }

    if (e.key === 'Escape') {
      closeNavList();
    }
  })
})
