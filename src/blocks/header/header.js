/* global $ */
const headerBurger = 'header__burger';
const headerBody = 'header__body';

function addBurgerListener() {
  $(`.js-${headerBurger}`).toggleClass(`${headerBurger}_active`);
  $(`.js-${headerBody}`).toggleClass(`${headerBody}_active`);
}

$('.js-header__burger').on('click', addBurgerListener);
