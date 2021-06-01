class Carousel {
  constructor(carousel, selector) {
    this.carousel = carousel;
    this.selector = selector;
  }

  init() {
    const prevBtn = this.carousel.querySelector(`.${this.selector}__prev`);
    const nextBtn = this.carousel.querySelector(`.${this.selector}__next`);

    this.items = this.carousel.querySelectorAll(`.${this.selector}__item`);
    this.dots = this.carousel.querySelectorAll(`.${this.selector}__dot`);
    this.currentIndex = 0;

    prevBtn.addEventListener('click', this._prev.bind(this));
    nextBtn.addEventListener('click', this._next.bind(this));

    this._update();
  }

  _update() {
    this.items.forEach((item, i) => {
      if (i === this.currentIndex) {
        item.classList.add(`${this.selector}__item_active`);
        this.dots[i].classList.add(`${this.selector}__dot_active`);
      } else {
        item.classList.remove(`${this.selector}__item_active`);
        this.dots[i].classList.remove(`${this.selector}__dot_active`);
      }
    });
  }

  _prev() {
    if (this.currentIndex - 1 < 0) {
      this.currentIndex = this.items.length - 1;
    } else {
      this.currentIndex -= 1;
    }

    this._update();
  }

  _next() {
    if (this.currentIndex + 1 >= this.items.length) {
      this.currentIndex = 0;
    } else {
      this.currentIndex += 1;
    }

    this._update();
  }
}

export default Carousel;
