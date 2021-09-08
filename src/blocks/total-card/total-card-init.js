/* global document */

import 'Blocks/twin-datepick/twin-datepick-init';
import 'Blocks/dropdown-absolute/dropdown-absolute-init';
import 'Blocks/tooltip/tolltip';
import 'Blocks/button/button';

import TotalCard from './TotalCard';

import './total-card.scss';

const BLOCKNAME = 'total-card';

function handleDOMLoaded() {
  const totalCards = document.querySelectorAll(`.js-${BLOCKNAME}`);

  totalCards.forEach((item) => {
    const totalCard = new TotalCard(item, BLOCKNAME);

    totalCard.init();
  });
}

document.addEventListener('DOMContentLoaded', handleDOMLoaded);
