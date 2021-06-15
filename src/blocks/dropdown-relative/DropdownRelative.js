class DropdownRelative {
  constructor(dropdown, selector) {
    this.dropdown = dropdown;
    this.selector = selector;
  }

  init() {
    const { dropdown, selector } = this;

    this.title = dropdown.querySelector(`.js-${selector}__content`);
    this.list = dropdown.querySelector(`.js-${selector}__list`);

    this.title.addEventListener('click', this._handleTitleClick.bind(this));
  }

  _handleTitleClick() {
    const {
      title,
      list,
      dropdown,
      selector,
    } = this;

    dropdown.classList.toggle(`${selector}_active`);
    title.classList.toggle(`${selector}__content_active`);
    list.classList.toggle(`${selector}__list_active`);
  }
}

export default DropdownRelative;
