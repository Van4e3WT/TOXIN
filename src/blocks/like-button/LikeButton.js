class LikeButton {
  constructor(like, selector) {
    this.like = like;
    this.selector = selector;
  }

  init() {
    this.input = this.like.querySelector(`.${this.selector}__input`);

    this.input.addEventListener('change', this._handleLikeChange.bind(this));
  }

  _handleLikeChange() {
    const counter = this.like.querySelector(`.${this.selector}__counter`);

    if (this.input.checked) {
      counter.textContent = parseInt(counter.textContent, 10) + 1;
    } else {
      counter.textContent = parseInt(counter.textContent, 10) - 1;
    }
  }
}

export default LikeButton;
