/* global document */

import DropdownRelative from './DropdownRelative';

import './dropdown-relative.scss';
import 'Blocks/checkbox/checkbox';

const BLOCKNAME = 'dropdown-relative';

function handleDOMLoaded() {
  const dropdowns = document.querySelectorAll(`.js-${BLOCKNAME}`);

  dropdowns.forEach((item) => {
    const dropdown = new DropdownRelative(item, BLOCKNAME);

    dropdown.init();
  });
}

document.addEventListener('DOMContentLoaded', handleDOMLoaded);
