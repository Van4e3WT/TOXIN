class LikeButton {
  constructor(like, selector) {
    this.like = like;
    this.selector = selector;
  }

  init() {
    this.input = this.like.querySelector(`.${this.selector}__input`);
    this.counter = this.like.querySelector(`.${this.selector}__counter`);

    this.input.addEventListener('change', this._handleLikeChange.bind(this));
  }

  _handleLikeChange() {
    if (this.input.checked) {
      this.counter.textContent = parseInt(this.counter.textContent, 10) + 1;
    } else {
      this.counter.textContent = parseInt(this.counter.textContent, 10) - 1;
    }
  }
}

export default LikeButton;
