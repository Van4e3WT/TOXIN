/* global document */

const BLOCKNAME = 'dropdown-relative';

function addDropdownRelListeners() {
  const dropdowns = document.querySelectorAll(`.${BLOCKNAME}`);

  function toggleActiveDropdown() {
    this.classList.toggle(`${BLOCKNAME}_active`);
  }

  dropdowns.forEach((dropdown) => {
    dropdown.addEventListener('click', toggleActiveDropdown.bind(dropdown));
  });
}

document.addEventListener('DOMContentLoaded', addDropdownRelListeners);
