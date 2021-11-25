/* global document */

import 'Blocks/checkbox/checkbox';

import DropdownRelativeItem from './DropdownRelativeItem';

import './dropdown-relative.scss';

const BLOCKNAME = 'dropdown-relative';

function initDropdownRelative(constraintSelector) {
  const dropdowns = [];

  if (constraintSelector) {
    const constraints = document.querySelectorAll(constraintSelector);

    constraints.forEach((constraint) => {
      dropdowns.push(...constraint.querySelectorAll(`.js-${BLOCKNAME}`));
    });
  } else {
    dropdowns.push(...document.querySelectorAll(`.js-${BLOCKNAME}`));
  }

  dropdowns.forEach((item) => {
    const dropdown = new DropdownRelativeItem(item, BLOCKNAME);

    dropdown.init();
  });
}

export default initDropdownRelative;
