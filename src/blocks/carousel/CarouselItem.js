class CarouselItem {
  constructor(carousel, selector) {
    this.carousel = carousel;
    this.selector = selector;
  }

  init() {
    const { carousel, selector } = this;

    const prevBtn = carousel.querySelector(`.js-${selector}__prev`);
    const nextBtn = carousel.querySelector(`.js-${selector}__next`);

    this.items = carousel.querySelectorAll(`.js-${selector}__item`);
    this.dots = carousel.querySelectorAll(`.js-${selector}__dot`);
    this.currentIndex = 0;

    prevBtn.addEventListener('click', this._handlePrevBtnClick.bind(this));
    nextBtn.addEventListener('click', this._handleNextBtnClick.bind(this));

    this._update();
  }

  _update() {
    const {
      items,
      currentIndex,
      selector,
      dots,
    } = this;

    items.forEach((item, i) => {
      if (i === currentIndex) {
        item.classList.add(`${selector}__item_active`);
        dots[i].classList.add(`${selector}__dot_active`);
      } else {
        item.classList.remove(`${selector}__item_active`);
        dots[i].classList.remove(`${selector}__dot_active`);
      }
    });
  }

  _handlePrevBtnClick() {
    const { items } = this;

    if (this.currentIndex - 1 < 0) {
      this.currentIndex = items.length - 1;
    } else {
      this.currentIndex -= 1;
    }

    this._update();
  }

  _handleNextBtnClick() {
    const { items } = this;

    if (this.currentIndex + 1 >= items.length) {
      this.currentIndex = 0;
    } else {
      this.currentIndex += 1;
    }

    this._update();
  }
}

export default CarouselItem;
