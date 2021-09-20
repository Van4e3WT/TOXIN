/* global document */

class Header {
  constructor(props) {
    const { burger, burgerSelector, bodySelector } = props;

    this.burgerSelector = burgerSelector;
    this.bodySelector = bodySelector;
    this.burger = burger;

    this._handleBurgerClick = this._handleBurgerClick.bind(this);
  }

  init() {
    const { burger, burgerSelector, bodySelector } = this;

    this.burgerDivisions = document.querySelector(`.js-${burgerSelector}-divisions`);
    this.body = document.querySelector(`.js-${bodySelector}`);

    burger.addEventListener('click', this._handleBurgerClick);
  }

  _handleBurgerClick() {
    const {
      burgerSelector,
      bodySelector,
      burgerDivisions,
      burger,
      body,
    } = this;

    burgerDivisions.classList.toggle(`${burgerSelector}-divisions_active`);
    burger.classList.toggle(`${burgerSelector}_active`);
    body.classList.toggle(`${bodySelector}_active`);
  }
}

export default Header;
