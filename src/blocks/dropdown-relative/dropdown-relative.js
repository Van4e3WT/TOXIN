/* global document */

import 'Blocks/checkbox/checkbox';

import DropdownRelativeItem from './DropdownRelativeItem';

import './dropdown-relative.scss';

const BLOCKNAME = 'dropdown-relative';

function initDropdownRelative() {
  const dropdowns = document.querySelectorAll(`.js-${BLOCKNAME}`);

  dropdowns.forEach((item) => {
    const dropdown = new DropdownRelativeItem(item, BLOCKNAME);

    dropdown.init();
  });
}

export default initDropdownRelative;
