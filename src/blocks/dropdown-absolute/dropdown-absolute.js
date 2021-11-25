/* global document */

import DropdownAbsoluteItem from './DropdownAbsoluteItem';

import './dropdown-absolute.scss';

const BLOCKNAME = 'dropdown-absolute';

function initDropdownAbsolute(constraintSelector) {
  const dropdowns = [];

  if (constraintSelector) {
    const constraints = document.querySelectorAll(constraintSelector);

    constraints.forEach((constraint) => {
      dropdowns.push(...constraint.querySelectorAll(`.js-${BLOCKNAME}`));
    });
  } else {
    dropdowns.push(...document.querySelectorAll(`.js-${BLOCKNAME}`));
  }

  dropdowns.forEach((item, index) => {
    const dropdown = new DropdownAbsoluteItem(item, BLOCKNAME, dropdowns.length - index);

    dropdown.init();
  });
}

export default initDropdownAbsolute;
