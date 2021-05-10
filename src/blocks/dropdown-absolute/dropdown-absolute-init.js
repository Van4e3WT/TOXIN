/* global document */

import DropdownAbsolute from './DropdownAbsolute';

const BLOCKNAME = 'dropdown-absolute';

function initDropdownsAbsolute() {
  const dropdowns = document.querySelectorAll(`.js-${BLOCKNAME}`);

  dropdowns.forEach((item, i) => {
    const dropdown = new DropdownAbsolute(item, BLOCKNAME, dropdowns.length - i);
    dropdown.init();
  });
}

document.addEventListener('DOMContentLoaded', initDropdownsAbsolute);
