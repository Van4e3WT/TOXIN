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

    // const dropdownClear = this.dropdown.querySelector(`.${this.selector}__clear-btn`);
    // const dropdownApply = this.dropdown.querySelector(`.${this.selector}__apply-btn`);

    this.dropdownInput = dropdownOutput.querySelector(`.${this.selector}__input`);

    dropdownList.style.zIndex = this.zIndex;

    dropdownOutput.addEventListener('click', this.toggleList.bind(this));
    document.addEventListener('mouseup', this.hideLostList.bind(this));

    // if (dropdownClear) {
    //   dropdownClear.addEventListener('click', this.clearListValues.bind(this));
    // }

    // if (dropdownApply) {
    //   dropdownApply.addEventListener('click', this.toggleList.bind(this));
    // }

    const listItems = dropdownList.querySelectorAll(`.${this.selector}__item`);

    listItems.forEach((item) => {
      const minus = item.querySelector(`.${this.selector}__minus`);
      const counter = item.querySelector(`.${this.selector}__counter`);
      const plus = item.querySelector(`.${this.selector}__plus`);

      const decrementCounter = () => {
        if (+counter.textContent > 0) {
          counter.textContent = +counter.textContent - 1;
        }

        this.update();
      };

      const incrementCounter = () => {
        counter.textContent = +counter.textContent + 1;

        this.update();
      };

      minus.addEventListener('click', decrementCounter);
      plus.addEventListener('click', incrementCounter);
    });

    this.update();
  }

  update() {
    const items = this.dropdown.querySelectorAll(`.${this.selector}__item`);

    const resultArray = [];
    const buffer = {
      wordforms: items[0].dataset.wordforms.split(', '),
      value: 0,
    };

    items.forEach((item) => {
      this.updateCounterBlock(item);

      const counter = item.querySelector(`.${this.selector}__counter`);
      let value = 0;

      value = +counter.textContent;

      const wordforms = item.dataset.wordforms.split(', ');

      if (buffer.wordforms.toString() === wordforms.toString()) {
        buffer.value += value;
      } else if (value > 0) {
        resultArray.push({
          wordforms: buffer.wordforms,
          value: buffer.value,
        });

        buffer.wordforms = wordforms;
        buffer.value = value;
      }
    });

    if (buffer.value > 0) {
      resultArray.push(resultArray.push({
        wordforms: buffer.wordforms,
        value: buffer.value,
      }));
    }

    let resultStr = '';

    resultArray.forEach((obj) => {
      if (obj.value) {
        resultStr += `${obj.value} ${Utils.num2str(obj.value, obj.wordforms)}, `;
      }
    });

    this.dropdownInput.value = resultStr
      ? `${resultStr.split('').slice(0, -2).join('')}`
      : this.dropdownInput.dataset.placeholder;
    this.dropdownInput.setAttribute('title', this.dropdownInput.value);
  }

  updateCounterBlock(item) {
    const counter = item.querySelector(`.${this.selector}__counter`);
    const minus = item.querySelector(`.${this.selector}__minus`);

    if (+counter.textContent < 1) {
      minus.classList.add(`${this.selector}__minus_disabled`);
    } else {
      minus.classList.remove(`${this.selector}__minus_disabled`);
    }
  }

  toggleList() {
    this.dropdown.querySelector(`.${this.selector}__list`).classList.toggle(`${this.selector}__list_active`);
  }

  hideLostList(e) {
    const { target } = e;
    const list = this.dropdown.querySelector(`.${this.selector}__list`);

    if (!this.dropdown.contains(target)) {
      list.classList.remove(`${this.selector}__list_active`);
    }
  }

  clearListValues() {
    const counters = this.dropdown.querySelectorAll(`.${this.selector}__counter`);

    counters.forEach((counter) => {
      // eslint-disable-next-line no-param-reassign
      counter.textContent = 0;
    });

    this.update();
  }
}

export default DropdownAbsolute;
