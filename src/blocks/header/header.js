/* global $ */
const headerBurger = 'header-content__burger';
const headerBody = 'header-content__body';

function addBurgerListener() {
  $(`.js-${headerBurger}`).toggleClass(`${headerBurger}_active`);
  $(`.js-${headerBody}`).toggleClass(`${headerBody}_active`);
}

$('.js-header-content__burger').on('click', addBurgerListener);
