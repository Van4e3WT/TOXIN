/* global document */
function addDropdownRelListeners() {
  const dropdowns = document.querySelectorAll('.dropdown-checkbox');

  function toggleActiveDropdown(item) {
    item.querySelector('.dropdown-checkbox__title').classList.toggle('active');
  }

  dropdowns.forEach((dropdown) => {
    dropdown.addEventListener('click', toggleActiveDropdown.bind(null, dropdown));
  });
}

document.addEventListener('DOMContentLoaded', addDropdownRelListeners);
