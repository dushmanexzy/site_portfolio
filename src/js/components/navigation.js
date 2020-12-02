import vars from '../_vars';

vars.$window.addEventListener('DOMContentLoaded', () => {
  vars.$body.classList.remove('no-js');

  vars.$toggleNavBtn.addEventListener('click', (e) => {
    e.preventDefault();

    vars.$header.classList.toggle('menu-open');
  })
})
