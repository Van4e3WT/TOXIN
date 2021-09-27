/* global document */

import 'Blocks/twin-datepick/twin-datepick';
import 'Blocks/dropdown-absolute/dropdown-absolute';
import 'Blocks/tooltip/tolltip';
import 'Blocks/button/button';

import TotalCardItem from './TotalCardItem';

import './total-card.scss';

const BLOCKNAME = 'total-card';

function handleDOMLoaded() {
  const totalCards = document.querySelectorAll(`.js-${BLOCKNAME}`);

  totalCards.forEach((item) => {
    const totalCard = new TotalCardItem(item, BLOCKNAME);

    totalCard.init();
  });
}

document.addEventListener('DOMContentLoaded', handleDOMLoaded);
