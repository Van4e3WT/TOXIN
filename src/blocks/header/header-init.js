/* global document */

import 'Blocks/button/button';
import 'Blocks/logo/logo';

import './__ref-item/header__ref-item';
import Header from './Header';

import './header.scss';

function handleDOMLoaded() {
  const burger = document.querySelector('.js-header__burger');

  if (!burger) return;

  const header = new Header({
    burger,
    burgerSelector: 'header__burger',
    bodySelector: 'header__body',
  });

  header.init();
}

document.addEventListener('DOMContentLoaded', handleDOMLoaded);
