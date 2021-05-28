/* global $ */

import './header.scss';
import './__ref-item/header__ref-item';
import 'Blocks/logo/logo';
import 'Blocks/button/button';

const headerBurger = 'header__burger';
const headerBody = 'header__body';

function addBurgerListener() {
  $(`.js-${headerBurger}-divisions`).toggleClass(`${headerBurger}-divisions_active`);
  $(`.js-${headerBurger}`).toggleClass(`${headerBurger}_active`);
  $(`.js-${headerBody}`).toggleClass(`${headerBody}_active`);
}

$('.js-header__burger').on('click', addBurgerListener);
