/* global document */

import DropdownAbsoluteItem from './DropdownAbsoluteItem';

import './dropdown-absolute.scss';

const BLOCKNAME = 'dropdown-absolute';

function initDropdownAbsolute() {
  const dropdowns = document.querySelectorAll(`.js-${BLOCKNAME}`);

  dropdowns.forEach((item, index) => {
    const dropdown = new DropdownAbsoluteItem(item, BLOCKNAME, dropdowns.length - index);

    dropdown.init();
  });
}

export default initDropdownAbsolute;
