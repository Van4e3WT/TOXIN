/* global document */

import Carousel from './Сarousel';

import './carousel.scss';

const BLOCKNAME = 'carousel';

function carouselsInit() {
  const carousels = document.querySelectorAll(`.js-${BLOCKNAME}`);

  carousels.forEach((item) => {
    const carousel = new Carousel(item, BLOCKNAME);
    carousel.init();
  });
}

document.addEventListener('DOMContentLoaded', carouselsInit);
