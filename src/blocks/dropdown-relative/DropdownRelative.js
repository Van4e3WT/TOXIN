class DropdownRelative {
  constructor(dropdown, selector) {
    this.dropdown = dropdown;
    this.selector = selector;
  }

  init() {
    this.dropdown.addEventListener('click', this.toggleActiveDropdown.bind(this));
  }

  toggleActiveDropdown() {
    this.dropdown.classList.toggle(`${this.selector}_active`);
  }
}

export default DropdownRelative;
