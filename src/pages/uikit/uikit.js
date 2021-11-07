/* global document */

import initCards from 'Blocks/cards/cards';
import initFormElements from 'Blocks/form-elements/form-elements';
import initHeadersAndFooters from 'Blocks/headers-and-footers/headers-and-footers';
import 'Blocks/colors-and-fonts/colors-and-fonts';

import './uikit.scss';

function handleDOMLoaded() {
  initCards();
  initFormElements();
  initHeadersAndFooters();
}

document.addEventListener('DOMContentLoaded', handleDOMLoaded);
