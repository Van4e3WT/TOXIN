/* global document */

import LikeButtonItem from './LikeButtonItem';

import './like-button.scss';

const BLOCKNAME = 'like-button';

function initLikeButton(constraintSelector) {
  const likes = [];

  if (constraintSelector) {
    const constraints = document.querySelectorAll(constraintSelector);

    constraints.forEach((constraint) => {
      likes.push(...constraint.querySelectorAll(`.js-${BLOCKNAME}`));
    });
  } else {
    likes.push(...document.querySelectorAll(`.js-${BLOCKNAME}`));
  }

  likes.forEach((item) => {
    const like = new LikeButtonItem(item, BLOCKNAME);

    like.init();
  });
}

export default initLikeButton;
