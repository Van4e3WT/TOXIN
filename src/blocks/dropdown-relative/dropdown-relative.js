/* global document */

import 'Blocks/checkbox/checkbox';

import DropdownRelativeItem from './DropdownRelativeItem';

import './dropdown-relative.scss';

const BLOCKNAME = 'dropdown-relative';

function handleDOMLoaded() {
  const dropdowns = document.querySelectorAll(`.js-${BLOCKNAME}`);

  dropdowns.forEach((item) => {
    const dropdown = new DropdownRelativeItem(item, BLOCKNAME);

    dropdown.init();
  });
}

document.addEventListener('DOMContentLoaded', handleDOMLoaded);
