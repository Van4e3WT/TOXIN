/* global document */

import CarouselItem from './CarouselItem';

import './carousel.scss';

const BLOCKNAME = 'carousel';

function handleDOMLoaded() {
  const carousels = document.querySelectorAll(`.js-${BLOCKNAME}`);

  carousels.forEach((item) => {
    const carousel = new CarouselItem(item, BLOCKNAME);

    carousel.init();
  });
}

document.addEventListener('DOMContentLoaded', handleDOMLoaded);
