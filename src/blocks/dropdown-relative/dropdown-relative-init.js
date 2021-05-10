/* global document */

import DropdownRelative from './DropdownRelative';

const BLOCKNAME = 'dropdown-relative';

function initDropdownsRelative() {
  const dropdowns = document.querySelectorAll(`.js-${BLOCKNAME}`);

  dropdowns.forEach((item) => {
    const dropdown = new DropdownRelative(item, BLOCKNAME);
    dropdown.init();
  });
}

document.addEventListener('DOMContentLoaded', initDropdownsRelative);
