/* global document */

import initDropdownAbsolute from 'Blocks/dropdown-absolute/dropdown-absolute';
import initTwinDatepick from 'Blocks/twin-datepick/twin-datepick';
import 'Blocks/tooltip/tolltip';
import 'Blocks/button/button';

import TotalCardItem from './TotalCardItem';

import './total-card.scss';

const BLOCKNAME = 'total-card';

function initTotalCard() {
  initTwinDatepick('.js-total-card');
  initDropdownAbsolute('.js-total-card');

  const totalCards = document.querySelectorAll(`.js-${BLOCKNAME}`);

  totalCards.forEach((item) => {
    const totalCard = new TotalCardItem(item, BLOCKNAME);

    totalCard.init();
  });
}

export default initTotalCard;
