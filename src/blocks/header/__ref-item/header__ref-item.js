/* global document */

import HeaderItem from './HeaderItem';

function handleDOMLoaded() {
  const refItems = document.querySelectorAll('.js-header__item');

  refItems.forEach((item) => {
    const refItem = new HeaderItem(item);

    refItem.init();
  });
}

document.addEventListener('DOMContentLoaded', handleDOMLoaded);
