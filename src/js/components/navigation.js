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

  vars.$document.addEventListener('click', (e) => {
    e.preventDefault();

    if (!vars.$header.contains(e.target)) {
      closeNavList();
    }

    if (e.target.classList.contains('js-anchor')) {
      closeNavList();
    }

    vars.$body.addEventListener('keyup', (e) => {
      e.preventDefault();

      if (e.key === 'Escape') {
        closeNavList();
      }
    })
  })
})
