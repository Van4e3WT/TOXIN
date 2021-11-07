/* global document */

import initHeader from 'Blocks/header/header';
import 'Blocks/footer-mobile/footer-mobile';
import 'Blocks/footer/footer';

import './base.scss';

function handleDOMLoaded() {
  initHeader();
}

document.addEventListener('DOMContentLoaded', handleDOMLoaded);
