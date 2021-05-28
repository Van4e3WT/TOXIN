/* global document */

class HeaderItem {
  constructor(item) {
    this.item = item;
  }

  init() {
    this.list = this.item.querySelector('.header__item-list');
    this.item.addEventListener('click', this.toggleClass.bind(this));
    document.addEventListener('mouseup', this.removeClass.bind(this));
  }

  toggleClass() {
    this.list.classList.toggle('header__item-list_active');
  }

  removeClass(e) {
    const { target } = e;

    if (!this.item.contains(target)) {
      this.list.classList.remove('header__item-list_active');
    }
  }
}

export default HeaderItem;
