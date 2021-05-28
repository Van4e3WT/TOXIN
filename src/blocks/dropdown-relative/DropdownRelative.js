class DropdownRelative {
  constructor(dropdown, selector) {
    this.dropdown = dropdown;
    this.selector = selector;
  }

  init() {
    this.dropdown.addEventListener('click', this.toggleActiveDropdown.bind(this));
  }

  toggleActiveDropdown() {
    const title = this.dropdown.querySelector(`.${this.selector}__content`);
    const list = this.dropdown.querySelector(`.${this.selector}__list`);

    this.dropdown.classList.toggle(`${this.selector}_active`);
    title.classList.toggle(`${this.selector}__content_active`);
    list.classList.toggle(`${this.selector}__list_active`);
  }
}

export default DropdownRelative;
