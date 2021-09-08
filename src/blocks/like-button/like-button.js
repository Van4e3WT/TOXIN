/* global document */

import LikeButton from './LikeButton';

import './like-button.scss';

const BLOCKNAME = 'like-button';

function handleDOMLoaded() {
  const likes = document.querySelectorAll(`.js-${BLOCKNAME}`);

  likes.forEach((item) => {
    const like = new LikeButton(item, BLOCKNAME);

    like.init();
  });
}

document.addEventListener('DOMContentLoaded', handleDOMLoaded);
