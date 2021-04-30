/* global document */

const BLOCKNAME = 'carousel';

class Carousel {
  constructor(carousel) {
    this.carousel = carousel;
  }

  init() {
    const prevBtn = this.carousel.querySelector(`.${BLOCKNAME}__prev`);
    const nextBtn = this.carousel.querySelector(`.${BLOCKNAME}__next`);

    this.items = this.carousel.querySelectorAll(`.${BLOCKNAME}__item`);
    this.dots = this.carousel.querySelectorAll(`.${BLOCKNAME}__dot`);
    this.currentIndex = 0;

    prevBtn.addEventListener('click', this.prev.bind(this));
    nextBtn.addEventListener('click', this.next.bind(this));

    this.update();
  }

  update() {
    this.items.forEach((item, i) => {
      if (i === this.currentIndex) {
        item.classList.add(`${BLOCKNAME}__item_active`);
        this.dots[i].classList.add(`${BLOCKNAME}__dot_active`);
      } else {
        item.classList.remove(`${BLOCKNAME}__item_active`);
        this.dots[i].classList.remove(`${BLOCKNAME}__dot_active`);
      }
    });
  }

  prev() {
    if (this.currentIndex - 1 < 0) {
      this.currentIndex = this.items.length - 1;
    } else {
      this.currentIndex -= 1;
    }

    this.update();
  }

  next() {
    if (this.currentIndex + 1 >= this.items.length) {
      this.currentIndex = 0;
    } else {
      this.currentIndex += 1;
    }

    this.update();
  }
}

function carouselsInit() {
  const carousels = document.querySelectorAll(`.js-${BLOCKNAME}`);

  carousels.forEach((item) => {
    const carousel = new Carousel(item);
    carousel.init();
  });
}

document.addEventListener('DOMContentLoaded', carouselsInit);
