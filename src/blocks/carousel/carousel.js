/* global document */

const BLOCKNAME = 'carousel';

function carouselInit() {
  const carousels = document.querySelectorAll(`.${BLOCKNAME}`);

  carousels.forEach((carousel) => {
    const items = carousel.querySelectorAll(`.${BLOCKNAME}__item`);
    const dots = carousel.querySelectorAll(`.${BLOCKNAME}__dot`);
    const prevBtn = carousel.querySelector(`.${BLOCKNAME}__prev`);
    const nextBtn = carousel.querySelector(`.${BLOCKNAME}__next`);
    let sliderIndex = 0;

    function showSlides() {
      items.forEach((item, i) => {
        if (i === sliderIndex) {
          item.classList.add(`${BLOCKNAME}__item_active`);
          dots[i].classList.add(`${BLOCKNAME}__dot_active`);
        } else {
          item.classList.remove(`${BLOCKNAME}__item_active`);
          dots[i].classList.remove(`${BLOCKNAME}__dot_active`);
        }
      });
    }

    function prevBtnListener() {
      if (sliderIndex - 1 < 0) {
        sliderIndex = items.length - 1;
      } else {
        sliderIndex -= 1;
      }

      showSlides();
    }

    function nextBtnListener() {
      if (sliderIndex + 1 >= items.length) {
        sliderIndex = 0;
      } else {
        sliderIndex += 1;
      }

      showSlides();
    }

    prevBtn.addEventListener('click', prevBtnListener);
    nextBtn.addEventListener('click', nextBtnListener);

    showSlides();
  });
}

document.addEventListener('DOMContentLoaded', carouselInit);
