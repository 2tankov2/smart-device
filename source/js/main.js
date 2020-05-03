/* eslint-disable strict */

/* закрытие-открытие меню в подвале */
var navMain = document.querySelector('.page-footer__menu');
var navToggle = document.querySelector('.menu__toggle');

navMain.classList.remove('page-footer__menu--nojs');

navToggle.addEventListener('click', function () {
  if (navMain.classList.contains('page-footer__menu--closed')) {
    navMain.classList.remove('page-footer__menu--closed');
    navMain.classList.add('page-footer__menu--opened');

    navToggle.classList.remove('menu__toggle--closed');
    navToggle.classList.add('menu__toggle--opened');
  } else {
    navMain.classList.add('page-footer__menu--closed');
    navMain.classList.remove('page-footer__menu--opened');
    navToggle.classList.add('menu__toggle--closed');
    navToggle.classList.remove('menu__toggle--opened');
  }
});

/* закрытие-открытие модального окна "заказать звонок" */

var link = document.querySelector('.contacts-button');
var popup = document.querySelector('.modal-order-bell');
var overlay = document.querySelector('.modal__overlay');

var btnClose = popup.querySelector('.modal-close');
var form = popup.querySelector('form');
var firstName = popup.querySelector('[name=name]');
var tel = popup.querySelector('[name=tel]');
var message = popup.querySelector('[name=commit');

var isStorageSupport = true;
var storage = '';

var emptyFields = function () {
  firstName.value = '';
  tel.value = '';
  message.value = '';
};


try {
  storage['name'] = localStorage.getItem('name');
  storage['tel'] = localStorage.getItem('tel');
} catch (err) {
  isStorageSupport = false;
}

link.addEventListener('click', function (evt) {
  evt.preventDefault();
  popup.classList.add('modal-show');
  overlay.classList.add('modal-overlay-show');
  emptyFields();

  if (storage) {
    firstName.value = storage['name'];
    tel.value = storage['tel'];
    message.focus();
  } else {
    firstName.focus();
  }
});

btnClose.addEventListener('click', function (evt) {
  evt.preventDefault();
  popup.classList.remove('modal-show');
  overlay.classList.remove('modal-overlay-show');
  popup.classList.remove('modal-error');
});

overlay.addEventListener('click', function (event) {
  event.preventDefault();
  overlay.classList.remove('modal-show');
  popup.classList.remove('modal-error');
});
overlay.addEventListener('click', function (event) {
  event.preventDefault();
  overlay.classList.remove('modal-overlay-show');
  popup.classList.remove('modal-show');
  popup.classList.remove('modal-error');
});
document.addEventListener('keydown', function (evt) {
  if (evt.key === 'Escape') {
    if (popup.classList.contains('modal-show')) {
      popup.classList.remove('modal-show');
      popup.classList.remove('modal-error');
      overlay.classList.remove('modal-overlay-show');
    }
  }
});

form.addEventListener('submit', function (evt) {
  if (!firstName.value || !tel.value || !message.value) {
    evt.preventDefault();
    popup.classList.remove('modal-error');
    popup.offsetWidth = popup.offsetWidth;
    popup.classList.add('modal-error');
    if (!firstName) {
      firstName.focus();
    }
    if (!tel) {
      tel.focus();
    }
    if (!message) {
      message.focus();
    }
  } else {
    if (isStorageSupport) {
      localStorage.setItem('name', firstName.value);
      localStorage.setItem('tel', tel.value);
    }
  }
});

window.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    if (popup.classList.contains('modal-show')) {
      popup.classList.remove('modal-show');
      overlay.classList.remove('modal-overlay-show');
      popup.classList.remove('modal-error');
    }
  }
});

/* маска для поля ввода телефонного номера */

var orderPhone = document.querySelector('imaskjs__input-tel');
var modalPhone = document.getElementById('imaskjs__input-tel-modal');

var maskOptions = {
  mask: '+{7}(000)000-00-00'
};

// var mask = imask(orderPhone, maskOptions);

// mask.updateOptions({
//  mask: Number,
//  scale: 0,      // только целые числа
//  lazy: false,  // placeholder всегда видимый
//  placeholderChar: '#',
//  max: 10
// });
