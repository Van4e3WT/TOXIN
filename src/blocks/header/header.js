/* global document */

import 'Blocks/button/button';
import 'Blocks/logo/logo';

import initHeaderItem from './__ref-item/header__ref-item';
import HeaderItem from './HeaderItem';

import './header.scss';

function initHeader() {
  const burger = document.querySelector('.js-header__burger');

  if (!burger) return;

  const header = new HeaderItem({
    burger,
    burgerSelector: 'header__burger',
    bodySelector: 'header__body',
  });

  header.init();
  initHeaderItem();
}

export default initHeader;
