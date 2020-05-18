'use strict';

(function () {
  /* обрезание строки до нужной длины */
  var size = 200;
  var aboutInfo = document.querySelector('.about-info');
  var infoText = aboutInfo.textContent;

  if ((window.screen.width < 768) && (infoText.length > size)) {
    aboutInfo.textContent = infoText.slice(0, size) + '..';
  }

  /* закрытие-открытие меню в подвале */
  var navMain = document.querySelector('.footer-menu');
  var navToggle = navMain.querySelector('.footer-menu__toggle');
  var navAddress = document.querySelector('.footer-address');
  var navAddressToggle = navAddress.querySelector('.footer-menu__toggle');


  navMain.classList.remove('footer-menu--nojs');

  navMain.addEventListener('click', function () {
    if (navMain.classList.contains('footer-menu--closed')) {
      navMain.classList.remove('footer-menu--closed');
      navMain.classList.add('footer-menu--opened');

      navToggle.classList.remove('footer-menu__toggle--closed');
      navToggle.classList.add('footer-menu__toggle--opened');

      navAddress.classList.remove('footer-menu--opened');
      navAddress.classList.add('footer-menu--closed');

      navAddressToggle.classList.remove('footer-menu__toggle--opened');
      navAddressToggle.classList.add('footer-menu__toggle--closed');
    } else {
      navMain.classList.add('footer-menu--closed');
      navMain.classList.remove('footer-menu--opened');
      navToggle.classList.add('footer-menu__toggle--closed');
      navToggle.classList.remove('footer-menu__toggle--opened');

      navAddress.classList.remove('footer-menu--closed');
      navAddress.classList.add('footer-menu--opened');

      navAddressToggle.classList.remove('footer-menu__toggle--closed');
      navAddressToggle.classList.add('footer-menu__toggle--opened');
    }
  });

  navAddress.classList.remove('footer-menu--nojs');

  navAddress.addEventListener('click', function () {
    if (navAddress.classList.contains('footer-menu--closed')) {
      navAddress.classList.remove('footer-menu--closed');
      navAddress.classList.add('footer-menu--opened');

      navAddressToggle.classList.remove('footer-menu__toggle--closed');
      navAddressToggle.classList.add('footer-menu__toggle--opened');

      navMain.classList.remove('footer-menu--opened');
      navMain.classList.add('footer-menu--closed');

      navToggle.classList.remove('footer-menu__toggle--opened');
      navToggle.classList.add('footer-menu__toggle--closed');
    } else {
      navAddress.classList.add('footer-menu--closed');
      navAddress.classList.remove('footer-menu--opened');
      navAddressToggle.classList.add('footer-menu__toggle--closed');
      navAddressToggle.classList.remove('footer-menu__toggle--opened');

      navMain.classList.remove('footer-menu--closed');
      navMain.classList.add('footer-menu--opened');

      navToggle.classList.remove('footer-menu__toggle--closed');
      navToggle.classList.add('footer-menu__toggle--opened');
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
  var orderPhone = document.getElementById('imaskjs__input-tel');
  var modalPhone = document.getElementById('imaskjs__input-tel-modal');

  var maskOptions = {
    mask: '+{7}(000)000-00-00',
    max: 16
  };

  window.IMask(modalPhone, maskOptions);
  window.IMask(orderPhone, maskOptions);

}());
