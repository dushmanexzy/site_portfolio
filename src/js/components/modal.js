import vars from '../_vars';

'use strict';

const showModal = () => {
  vars.$modal.classList.remove('is-hidden');
  vars.$modal.setAttribute('aria-hidden', false);
  vars.$modalOverlay.classList.remove('is-hidden');
}

const hideModal = () => {
  vars.$modal.classList.add('is-hidden');
  vars.$modal.setAttribute('aria-hidden', true);
  vars.$modalOverlay.classList.add('is-hidden');
}

// open modal window
vars.$openModalBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();

    showModal();
  })
});


// hide modal window
vars.$modalOverlay.addEventListener('click', () => {
  hideModal();
});

vars.$closeModalBtn.addEventListener('click', () => {
  hideModal();
});

vars.$cancelFormBtn.addEventListener('click', () => {
  hideModal();
});

vars.$document.addEventListener('keyup', (e) => {
  e.preventDefault();

  if (e.key === 'Escape') {
    hideModal();
  }
})
