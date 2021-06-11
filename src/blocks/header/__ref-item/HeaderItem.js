/* global document */

class HeaderItem {
  constructor(item) {
    this.item = item;
  }

  init() {
    this.list = this.item.querySelector('.header__item-list');
    this.arrow = this.item.querySelector('.header__arrow');
    this.item.addEventListener('click', this._handleItemClick.bind(this));

    document.addEventListener('mouseup', this._handleItemOutsideMouseup.bind(this));
  }

  _handleItemClick() {
    this.list.classList.toggle('header__item-list_active');
    this.arrow.classList.toggle('header__arrow_active');
  }

  _handleItemOutsideMouseup(e) {
    const { target } = e;

    if (!this.item.contains(target)) {
      this.list.classList.remove('header__item-list_active');
      this.arrow.classList.remove('header__arrow_active');
    }
  }
}

export default HeaderItem;
