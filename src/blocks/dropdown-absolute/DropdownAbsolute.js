/* global document */

import Utils from './utils';

class DropdownAbsolute {
  constructor(dropdown, selector, zIndex = 1) {
    this.dropdown = dropdown;
    this.selector = selector;
    this.zIndex = zIndex;
  }

  init() {
    const dropdownOutput = this.dropdown.querySelector(`.${this.selector}__output`);
    const dropdownList = this.dropdown.querySelector(`.${this.selector}__list`);

    this.buttons = this.dropdown.querySelector(`.${this.selector}__buttons`);
    this.dropdownInput = dropdownOutput.querySelector(`.${this.selector}__input`);

    const handleInputDefaultEvents = (e) => e.preventDefault();
    dropdownList.style.zIndex = this.zIndex;

    dropdownOutput.addEventListener('click', this.handleDropdownClick.bind(this));
    document.addEventListener('mouseup', this.handleOutsideClick.bind(this));
    this.dropdownInput.addEventListener('mousedown', handleInputDefaultEvents);

    if (this.buttons) {
      this.dropdownClear = this.buttons.querySelector(`.${this.selector}__clear-btn`);
      this.dropdownApply = this.buttons.querySelector(`.${this.selector}__apply-btn`);

      this.dropdownClear.addEventListener('click', this.handleClearButtonClick.bind(this));
      this.dropdownApply.addEventListener('click', this.handleDropdownClick.bind(this));
    }

    const listItems = dropdownList.querySelectorAll(`.${this.selector}__item`);

    listItems.forEach((item) => {
      const minus = item.querySelector(`.${this.selector}__minus`);
      const counter = item.querySelector(`.${this.selector}__counter`);
      const plus = item.querySelector(`.${this.selector}__plus`);

      const handleCounterDecrement = () => {
        if (+counter.textContent > 0) {
          counter.textContent = +counter.textContent - 1;
        }

        this._update();
      };

      const handleCounterIncrement = () => {
        counter.textContent = +counter.textContent + 1;

        this._update();
      };

      minus.addEventListener('click', handleCounterDecrement);
      plus.addEventListener('click', handleCounterIncrement);
    });

    this._update();
  }

  _update() {
    const items = this.dropdown.querySelectorAll(`.${this.selector}__item`);

    const resultArray = [];
    const buffer = {
      wordforms: items[0].dataset.wordforms.split(', '),
      value: 0,
    };

    items.forEach((item) => {
      this._updateCounterBlock(item);

      const counter = item.querySelector(`.${this.selector}__counter`);
      let value = 0;

      value = +counter.textContent;

      const wordforms = item.dataset.wordforms.split(', ');

      if (buffer.wordforms.toString() === wordforms.toString()) {
        buffer.value += value;
      } else if (value > 0) {
        if (buffer.value > 0) {
          resultArray.push({
            wordforms: buffer.wordforms,
            value: buffer.value,
          });
        }

        buffer.wordforms = wordforms;
        buffer.value = value;
      }
    });

    if (buffer.value > 0) {
      resultArray.push({
        wordforms: buffer.wordforms,
        value: buffer.value,
      });
    }

    this._toggleCleanButton(resultArray.length);

    let resultStr = '';

    resultArray.forEach((obj) => {
      resultStr += `${obj.value} ${Utils.num2str(obj.value, obj.wordforms)}, `;
    });

    this.dropdownInput.value = resultStr
      ? `${resultStr.split('').slice(0, -2).join('')}`
      : this.dropdownInput.dataset.placeholder;
    this.dropdownInput.setAttribute('title', this.dropdownInput.value);
  }

  _toggleCleanButton(count) {
    if (!this.buttons) return;

    const toggle = count ? 'add' : 'remove';

    this.buttons.classList[toggle](`${this.selector}__buttons_non-empty`);
    this.dropdownClear.classList[toggle](`${this.selector}__clear-btn_non-empty`);
  }

  _updateCounterBlock(item) {
    const counter = item.querySelector(`.${this.selector}__counter`);
    const minus = item.querySelector(`.${this.selector}__minus`);

    if (+counter.textContent < 1) {
      minus.classList.add(`${this.selector}__minus_disabled`);
    } else {
      minus.classList.remove(`${this.selector}__minus_disabled`);
    }
  }

  handleDropdownClick() {
    this.dropdown.querySelector(`.${this.selector}__list`)
      .classList.toggle(`${this.selector}__list_active`);
  }

  handleOutsideClick(e) {
    const { target } = e;
    const list = this.dropdown.querySelector(`.${this.selector}__list`);

    if (!this.dropdown.contains(target)) {
      list.classList.remove(`${this.selector}__list_active`);
    }
  }

  handleClearButtonClick() {
    const counters = this.dropdown.querySelectorAll(`.${this.selector}__counter`);

    counters.forEach((counter) => {
      // eslint-disable-next-line no-param-reassign
      counter.textContent = 0;
    });

    this._update();
  }
}

export default DropdownAbsolute;
