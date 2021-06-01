/* global document */

class HeaderItem {
  constructor(item) {
    this.item = item;
  }

  init() {
    this.list = this.item.querySelector('.header__item-list');
    this.item.addEventListener('click', this._toggleClass.bind(this));
    document.addEventListener('mouseup', this._removeClass.bind(this));
  }

  _toggleClass() {
    this.list.classList.toggle('header__item-list_active');
  }

  _removeClass(e) {
    const { target } = e;

    if (!this.item.contains(target)) {
      this.list.classList.remove('header__item-list_active');
    }
  }
}

export default HeaderItem;
