class LikeButton {
  constructor(like, selector) {
    this.like = like;
    this.selector = selector;
  }

  init() {
    const { like, selector } = this;

    this.input = like.querySelector(`.js-${selector}__input`);
    this.counter = like.querySelector(`.js-${selector}__counter`);

    this.input.addEventListener('change', this._handleLikeChange.bind(this));
  }

  _handleLikeChange() {
    const { input, counter } = this;

    if (input.checked) {
      counter.textContent = parseInt(counter.textContent, 10) + 1;
    } else {
      counter.textContent = parseInt(counter.textContent, 10) - 1;
    }
  }
}

export default LikeButton;
