/* global $ */
function addBurgerListener() {
  $('.js-header-content__burger, .js-header-content__body').toggleClass('active');
}

$('.js-header-content__burger').on('click', addBurgerListener);
