/* global document */

import Utils from './utils';

class DropdownAbsolute {
  constructor(dropdown, selector, zIndex = 1) {
    this.dropdown = dropdown;
    this.selector = selector;
    this.zIndex = zIndex;
  }

  init() {
    this.dropdownInput = this.dropdown.querySelector(`.${this.selector}__input`);
    const dropdownOutput = this.dropdown.querySelector(`.${this.selector}__output`);
    const dropdownClear = this.dropdown.querySelector(`.${this.selector}__clear-btn`);
    const dropdownApply = this.dropdown.querySelector(`.${this.selector}__apply-btn`);
    const dropdownList = this.dropdown.querySelector(`.${this.selector}__list`);

    dropdownList.style.zIndex = this.zIndex;

    dropdownOutput.addEventListener('click', this.toggleList.bind(this));
    document.addEventListener('mouseup', this.hideLostList.bind(this));

    if (dropdownClear) {
      dropdownClear.addEventListener('click', this.clearListValues.bind(this));
    }

    if (dropdownApply) {
      dropdownApply.addEventListener('click', this.toggleList.bind(this));
    }

    const listItems = this.dropdown.querySelectorAll(`.${this.selector}__item`);
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
    const defaultValue = this.dropdownInput.getAttribute('default');

    const updateCounterBlock = (item) => {
      const counter = item.querySelector(`.${this.selector}__counter`);
      const minus = item.querySelector(`.${this.selector}__minus`);

      if (+counter.textContent < 1) {
        minus.classList.add(`${this.selector}__minus_disabled`);
      } else {
        minus.classList.remove(`${this.selector}__minus_disabled`);
      }
    };

    if (this.dropdown.hasAttribute('several-word-forms')) {
      const result = [];
      let sum = 0;

      this.dropdown.querySelectorAll(`.${this.selector}__item`).forEach((item) => {
        updateCounterBlock(item);

        if (item.hasAttribute('wordforms')) {
          const counters = item.querySelectorAll(`.${this.selector}__counter`);
          let value;

          counters.forEach((counter) => {
            value = +counter.textContent;
            sum += +counter.textContent;
          });

          if (value > 0) {
            const wordForms = item.getAttribute('wordforms').split(', ');
            const rightForm = Utils.num2str(value, wordForms);

            result.push(`${value} ${rightForm}`);
          }
        }

        if (sum !== 0) {
          let resultStr = '';

          for (let j = 0; j < result.length; j += 1) {
            resultStr += j ? `, ${result[j]}` : result[j];
          }

          this.dropdownInput.value = `${resultStr}\u2026`;
          this.dropdownInput.setAttribute('title', this.dropdownInput.value);
        } else {
          this.dropdownInput.value = defaultValue;
          this.dropdownInput.setAttribute('title', defaultValue);
        }
      });
    } else {
      const buttonsBlock = this.dropdown.querySelector(`.${this.selector}__buttons`);
      let value = 0;

      this.dropdown.querySelectorAll(`.${this.selector}__item`).forEach((item) => {
        updateCounterBlock(item);
        value += (+item.querySelector(`.${this.selector}__counter`).textContent);
      });

      const wordForms = this.dropdown.hasAttribute('wordforms') ? this.dropdown.getAttribute('wordforms').split(', ') : null;
      const rightForm = wordForms ? Utils.num2str(value, wordForms) : '';

      if (value !== 0) {
        this.dropdownInput.value = `${value} ${rightForm}`;
        buttonsBlock.classList.add(`${this.selector}__buttons_non-empty`);
      } else {
        this.dropdownInput.value = defaultValue;
        buttonsBlock.classList.remove(`${this.selector}__buttons_non-empty`);
      }
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
