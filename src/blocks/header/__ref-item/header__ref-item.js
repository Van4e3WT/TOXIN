/* global document */

import HeaderItem from './HeaderItem';

function initRefItems() {
  const refItems = document.querySelectorAll('.js-header__item');

  refItems.forEach((item) => {
    const refItem = new HeaderItem(item);

    refItem.init();
  });
}

document.addEventListener('DOMContentLoaded', initRefItems);
