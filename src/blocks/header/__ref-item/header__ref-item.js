/* global document */

import HeaderItem from './HeaderItem';

function initHeaderItem() {
  const refItems = document.querySelectorAll('.js-header__item');

  refItems.forEach((item) => {
    const refItem = new HeaderItem(item);

    refItem.init();
  });
}

export default initHeaderItem;
