import $ from 'jquery';
'use strict';
// vars
const body = $('.js-body');
const modal = $('.js-modal');
const form = $('.modal-form');
const modalOverlay = $('.js-modal-overlay');
const openModalBtns = $('.js-open-modal');
const closeModalBtn = $('.js-modal-close');
const cancelModalBtn = $('.js-form-cancel');
const modalInputArea = $('.js-modal-input');

let currentFocusElement;

// functions
const showModal = () => {
  body.addClass('stop-scroll');
  modal.attr('display', 'block');
  modalOverlay.attr('display', 'block');
  modalOverlay.fadeIn('slow');
  modal.fadeIn('slow');
  modal.attr('aria-hidden', false);
  cancelModalBtn.focus();
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
// click on close btn
closeModalBtn.click((e) => {
  e.preventDefault();
  hideModal();
  cleaningModalInputArea();
  currentFocusElement.focus();
})

// click on cancel btn
cancelModalBtn.click((e) => {
  e.preventDefault();
  hideModal();
  cleaningModalInputArea();
  currentFocusElement.focus();
})

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
