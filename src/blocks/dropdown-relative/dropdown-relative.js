/* global document */

const BLOCKNAME = 'dropdown-relative';

class DropdownRelative {
  constructor(dropdown) {
    this.dropdown = dropdown;
  }

  init() {
    this.dropdown.addEventListener('click', this.toggleActiveDropdown.bind(this));
  }

  toggleActiveDropdown() {
    this.dropdown.classList.toggle(`${BLOCKNAME}_active`);
  }
}

function initDropdownsRelative() {
  const dropdowns = document.querySelectorAll(`.js-${BLOCKNAME}`);

  dropdowns.forEach((item) => {
    const dropdown = new DropdownRelative(item);
    dropdown.init();
  });
}

document.addEventListener('DOMContentLoaded', initDropdownsRelative);
