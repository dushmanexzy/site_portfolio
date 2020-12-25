'use strict';
// vars
const body = $('.js-body');
const modal = $('.js-modal');
const modalOverlay = $('.js-modal-overlay');
const openModalBtns = $('.js-open-modal');
const closeModalBtn = $('.js-modal-close');
const cancelModalBtn = $('.js-form-cancel');
const modalInputArea = $('.js-modal-input');

// functions
const showModal = () => {
  modal.attr('display', 'block');
  modalOverlay.attr('display', 'block');
  modalOverlay.fadeIn('slow');
  modal.fadeIn('slow');
  modal.attr('aria-hidden', false);
}

const hideModal = () => {
  modalOverlay.fadeOut('slow');
  modal.fadeOut('slow');
  modal.attr('display', 'none');
  modalOverlay.attr('display', 'none');
  modal.attr('aria-hidden', true);
}

const cleaningModalInputArea = () => {
  modalInputArea.each((i) => {
    modalInputArea[i].value = '';
  })
}

// open modal window
openModalBtns.each((i) => {
  openModalBtns[i].addEventListener('click', (e) => {
    e.preventDefault();
    showModal();
  })
});

// close modal window
// click on close btn
closeModalBtn.click((e) => {
  e.preventDefault();
  hideModal();
})

// click on cancel btn
cancelModalBtn.click((e) => {
  e.preventDefault();
  hideModal();
  cleaningModalInputArea();
})

// click on key 'Esc'
body.keyup((e) => {
  e.preventDefault();

  if (e.key === 'Escape') {
    hideModal();
    cleaningModalInputArea();
  }
})

// click on area != modal
modalOverlay.click(() => {
  hideModal();
})
