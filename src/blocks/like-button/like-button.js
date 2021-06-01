/* global document */

import './like-button.scss';
import LikeButton from './LikeButton';

const BLOCKNAME = 'like-button';

function handleDOMLoaded() {
  const likes = document.querySelectorAll(`.js-${BLOCKNAME}`);

  likes.forEach((item) => {
    const like = new LikeButton(item, BLOCKNAME);

    like.init();
  });
}

document.addEventListener('DOMContentLoaded', handleDOMLoaded);
