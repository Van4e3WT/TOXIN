/* global document */

class HeaderItem {
  constructor(item) {
    this.item = item;
  }

  init() {
    const { item } = this;

    this.list = item.querySelector('.js-header__item-list');
    this.arrow = item.querySelector('.js-header__arrow');

    item.addEventListener('click', this._handleItemClick.bind(this));

    document.addEventListener('mouseup', this._handleItemOutsideMouseup.bind(this));
  }

  _handleItemClick() {
    const { list, arrow } = this;

    list.classList.toggle('header__item-list_active');
    arrow.classList.toggle('header__arrow_active');
  }

  _handleItemOutsideMouseup(e) {
    const { item, list, arrow } = this;
    const { target } = e;

    if (!item.contains(target)) {
      list.classList.remove('header__item-list_active');
      arrow.classList.remove('header__arrow_active');
    }
  }
}

export default HeaderItem;
