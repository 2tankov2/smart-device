'use strict';
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
