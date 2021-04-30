/* global document */
const BLOCKNAME = 'dropdown-absolute';

function num2str(i, textForms) {
  const n = Math.abs(i) % 100;
  const n1 = n % 10;

  if (n > 10 && n < 20) return textForms[2];
  if (n1 > 1 && n1 < 5) return textForms[1];
  if (n1 === 1) return textForms[0];

  return textForms[2];
}

class DropdownAbsolute {
  constructor(dropdown, zIndex = 1) {
    this.dropdown = dropdown;
    this.zIndex = zIndex;
  }

  init() {
    this.dropdownOutput = this.dropdown.querySelector(`.${BLOCKNAME}__output`);
    const dropdownClear = this.dropdown.querySelector(`.${BLOCKNAME}__clear-btn`);
    const dropdownApply = this.dropdown.querySelector(`.${BLOCKNAME}__apply-btn`);
    const dropdownList = this.dropdown.querySelector(`.${BLOCKNAME}__list`);

    dropdownList.style.zIndex = this.zIndex;

    this.dropdownOutput.addEventListener('click', this.toggleActiveOnList.bind(this));

    if (dropdownClear) {
      dropdownClear.addEventListener('click', this.clearListValues.bind(this));
    }

    if (dropdownApply) {
      dropdownApply.addEventListener('click', this.toggleActiveOnList.bind(this));
    }

    const listItems = this.dropdown.querySelectorAll(`.${BLOCKNAME}__item`);
    listItems.forEach((item) => {
      const minus = item.querySelector(`.${BLOCKNAME}__minus`);
      const counter = item.querySelector(`.${BLOCKNAME}__counter`);
      const plus = item.querySelector(`.${BLOCKNAME}__plus`);

      function decrementCounter() {
        if (+counter.textContent > 0) {
          counter.textContent = +counter.textContent - 1;
        }
        this.update();
      }

      function incrementCounter() {
        counter.textContent = +counter.textContent + 1;
        this.update();
      }

      minus.addEventListener('click', decrementCounter.bind(this));
      plus.addEventListener('click', incrementCounter.bind(this));
    });

    this.update();
  }

  update() {
    const defaultValue = this.dropdownOutput.getAttribute('default');

    function updateCounterBlock(item) {
      const counter = item.querySelector(`.${BLOCKNAME}__counter`);
      const minus = item.querySelector(`.${BLOCKNAME}__minus`);

      if (+counter.textContent < 1) {
        minus.classList.add(`${BLOCKNAME}__minus_disabled`);
      } else {
        minus.classList.remove(`${BLOCKNAME}__minus_disabled`);
      }
    }

    if (this.dropdown.hasAttribute('several-word-forms')) {
      const result = [];
      let sum = 0;

      this.dropdown.querySelectorAll(`.${BLOCKNAME}__item`).forEach((item) => {
        updateCounterBlock(item);

        if (item.hasAttribute('wordforms')) {
          const counters = item.querySelectorAll(`.${BLOCKNAME}__counter`);
          let value;

          counters.forEach((counter) => {
            value = +counter.textContent;
            sum += +counter.textContent;
          });

          if (value > 0) {
            const wordForms = item.getAttribute('wordforms').split(', ');
            const rightForm = num2str(value, wordForms);

            result.push(`${value} ${rightForm}`);
          }
        }

        if (sum !== 0) {
          let resultStr = '';

          for (let j = 0; j < result.length; j += 1) {
            resultStr += j ? `, ${result[j]}` : result[j];
          }

          this.dropdownOutput.value = `${resultStr}\u2026`;
        } else {
          this.dropdownOutput.value = defaultValue;
        }
      });
    } else {
      const buttonsBlock = this.dropdown.querySelector(`.${BLOCKNAME}__buttons`);
      let value = 0;

      this.dropdown.querySelectorAll(`.${BLOCKNAME}__item`).forEach((item) => {
        updateCounterBlock(item);
        value += (+item.querySelector(`.${BLOCKNAME}__counter`).textContent);
      });

      const wordForms = this.dropdown.hasAttribute('wordforms') ? this.dropdown.getAttribute('wordforms').split(', ') : null;
      const rightForm = wordForms ? num2str(value, wordForms) : '';

      if (value !== 0) {
        this.dropdownOutput.value = `${value} ${rightForm}`;
        buttonsBlock.classList.add(`${BLOCKNAME}__buttons_non-empty`);
      } else {
        this.dropdownOutput.value = defaultValue;
        buttonsBlock.classList.remove(`${BLOCKNAME}__buttons_non-empty`);
      }
    }
  }

  toggleActiveOnList() {
    this.dropdown.querySelector(`.${BLOCKNAME}__list`).classList.toggle(`${BLOCKNAME}__list_active`);
  }

  clearListValues() {
    const counters = this.dropdown.querySelectorAll(`.${BLOCKNAME}__counter`);

    counters.forEach((counter) => {
      // eslint-disable-next-line no-param-reassign
      counter.textContent = 0;
    });

    this.update();
  }
}

function initDropdownsAbsolute() {
  const dropdowns = document.querySelectorAll(`.js-${BLOCKNAME}`);

  dropdowns.forEach((item, i) => {
    const dropdown = new DropdownAbsolute(item, dropdowns.length - i);
    dropdown.init();
  });
}

document.addEventListener('DOMContentLoaded', initDropdownsAbsolute);
