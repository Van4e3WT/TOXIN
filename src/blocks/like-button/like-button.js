/* global document */

import LikeButtonItem from './LikeButtonItem';

import './like-button.scss';

const BLOCKNAME = 'like-button';

function initLikeButton() {
  const likes = document.querySelectorAll(`.js-${BLOCKNAME}`);

  likes.forEach((item) => {
    const like = new LikeButtonItem(item, BLOCKNAME);

    like.init();
  });
}

export default initLikeButton;
