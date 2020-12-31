import $ from 'jquery';
'use strict';
// vars
const body = $('.js-body');
const modal = $('.js-modal');
const form = $('.modal-form');
const modalOverlay = $('.js-modal-overlay');
const openModalBtns = $('.js-open-modal');
const closeModalBtns = $('.js-modal-close');

let currentFocusElement;

// functions
const showModal = () => {
  body.addClass('stop-scroll');
  modal.attr('display', 'block');
  modalOverlay.attr('display', 'block');
  modalOverlay.fadeIn('slow');
  modal.fadeIn('slow');
  modal.attr('aria-hidden', false);
  closeModalBtns[1].focus();
}

const hideModal = () => {
  body.removeClass('stop-scroll');
  modalOverlay.fadeOut('slow');
  modal.fadeOut('slow');
  modal.attr('display', 'none');
  modalOverlay.attr('display', 'none');
  modal.attr('aria-hidden', true);
}

const cleaningModalInputArea = () => {
  form.trigger('reset');
}

const getFocusElement = (e) => {
  return e.target;
}

// open modal window
openModalBtns.each((i) => {

  openModalBtns[i].addEventListener('click', (e) => {
    e.preventDefault();
    currentFocusElement = getFocusElement(e);
    showModal();
  })
});

// close modal window
// click on close btn ("X" or "Отмена")
closeModalBtns.each((i) => {

  closeModalBtns[i].addEventListener('click', (e) => {
    e.preventDefault();
    hideModal();
    cleaningModalInputArea();
    currentFocusElement.focus();
  })
});

// click on key 'Esc'
body.keyup((e) => {
  e.preventDefault();

  if (e.key === 'Escape') {
    hideModal();
    cleaningModalInputArea();
    currentFocusElement.focus();
  }
})

// click on area != modal
modalOverlay.click(() => {
  hideModal();
  cleaningModalInputArea();
  currentFocusElement.focus();
})
