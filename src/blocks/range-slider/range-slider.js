/* global document */
import Multislider from 'Root/libs/multislider-v43/Multislider';

import './range-slider.scss';

const DEFAULT_PROPS = {
  minValue: 0,
  maxValue: 15000,
  value1: 5000,
  value2: 10000,
  step: 100,
  isRange: true,
  isProgressBar: true,
  postfix: '₽',
  description: 'Диапазон цены',
};

function handleDOMLoaded() {
  const items = document.querySelectorAll('.js-multislider-v43');

  items.forEach((item) => {
    const slider = new Multislider(item, DEFAULT_PROPS);

    slider.init();
  });
}

document.addEventListener('DOMContentLoaded', handleDOMLoaded);
