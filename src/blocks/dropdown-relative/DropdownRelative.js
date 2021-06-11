class DropdownRelative {
  constructor(dropdown, selector) {
    this.dropdown = dropdown;
    this.selector = selector;
  }

  init() {
    this.title = this.dropdown.querySelector(`.${this.selector}__content`);
    this.list = this.dropdown.querySelector(`.${this.selector}__list`);

    this.title.addEventListener('click', this._handleTitleClick.bind(this));
  }

  _handleTitleClick() {
    this.dropdown.classList.toggle(`${this.selector}_active`);
    this.title.classList.toggle(`${this.selector}__content_active`);
    this.list.classList.toggle(`${this.selector}__list_active`);
  }
}

export default DropdownRelative;
