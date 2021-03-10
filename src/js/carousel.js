/* global document */

function carouselInit() {
  const carousels = document.querySelectorAll('.carousel');

  carousels.forEach((carousel) => {
    const items = carousel.querySelectorAll('.carousel__item');
    const dots = carousel.querySelectorAll('.carousel__dot');
    const prevBtn = carousel.querySelector('.carousel__prev');
    const nextBtn = carousel.querySelector('.carousel__next');
    let sliderIndex = 0;

    function showSlides() {
      items.forEach((item, i) => {
        if (i === sliderIndex) {
          item.classList.add('active');
          dots[i].classList.add('active');
        } else {
          item.classList.remove('active');
          dots[i].classList.remove('active');
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
