/* eslint-disable no-param-reassign */
/* global document */

import Utils from './utils';

class DropdownAbsolute {
  constructor(dropdown, selector, zIndex = 1) {
    this.dropdown = dropdown;
    this.selector = selector;
    this.zIndex = zIndex;
    this.items = [];
    this.itemsGroups = [];
  }

  init() {
    this.dropdownOutput = this.dropdown.querySelector(`.js-${this.selector}__output`);
    this.dropdownList = this.dropdown.querySelector(`.js-${this.selector}__list`);
    this.dropdownInput = this.dropdownOutput.querySelector(`.js-${this.selector}__input`);
    this.buttons = this.dropdownList.querySelector(`.js-${this.selector}__buttons`);

    this._getItems();
    this._getGroupsItems();

    this.dropdownList.style.zIndex = this.zIndex;

    const handleInputDefaultEvents = (e) => e.preventDefault();

    this.dropdownOutput.addEventListener('click', this._handleDropdownClick.bind(this));
    document.addEventListener('mouseup', this._handleOutsideClick.bind(this));
    this.dropdownInput.addEventListener('mousedown', handleInputDefaultEvents);

    if (this.buttons) {
      this.dropdownClear = this.buttons.querySelector(`.js-${this.selector}__clear-btn`);
      this.dropdownApply = this.buttons.querySelector(`.js-${this.selector}__apply-btn`);

      this.dropdownClear.addEventListener('click', this._handleClearButtonClick.bind(this));
      this.dropdownApply.addEventListener('click', this._handleDropdownClick.bind(this));
    }

    this.itemsGroups.forEach((itemsGroup) => {
      itemsGroup.forEach((item) => {
        const handleCounterDecrement = () => {
          if (+item.counter.textContent > 0) {
            item.counter.textContent = +item.counter.textContent - 1;
            item.root.dataset.value = item.counter.textContent;
          }

          this._updateDecrement(item, itemsGroup, itemsGroup[0].root.dataset.maxValue);
          this._update();
        };

        const handleCounterIncrement = () => {
          if (Utils.getGroupSum(itemsGroup) < +itemsGroup[0].root.dataset.maxValue) {
            item.counter.textContent = +item.counter.textContent + 1;
            item.root.dataset.value = item.counter.textContent;
          }

          this._updateIncrement(item, itemsGroup, itemsGroup[0].root.dataset.maxValue);
          this._update();
        };

        item.minus.addEventListener('click', handleCounterDecrement);
        item.plus.addEventListener('click', handleCounterIncrement);

        this._updateDecrement(item, itemsGroup, itemsGroup[0].root.dataset.maxValue);
        this._updateIncrement(item, itemsGroup, itemsGroup[0].root.dataset.maxValue);
      });
    });

    this._update();
  }

  _getItems() {
    const items = this.dropdown.querySelectorAll(`.js-${this.selector}__item`);

    items.forEach((item) => {
      const minus = item.querySelector(`.js-${this.selector}__minus`);
      const counter = item.querySelector(`.js-${this.selector}__counter`);
      const plus = item.querySelector(`.js-${this.selector}__plus`);

      this.items.push({
        root: item,
        minus,
        counter,
        plus,
      });
    });
  }

  _getGroupsItems() {
    const buffer = {
      item: this.items[0],
      wordforms: this.items[0].root.dataset.wordforms,
    };

    let bufferArray = [];

    this.items.forEach((item) => {
      if (buffer.wordforms === item.root.dataset.wordforms) {
        bufferArray.push(item);
      } else {
        this.itemsGroups.push(bufferArray);
        bufferArray = [item];
      }
    });

    this.itemsGroups.push(bufferArray);
  }

  _updateDecrement(currentItem, itemsGroup, maxValue) {
    if (+currentItem.counter.textContent < 1) {
      currentItem.minus.classList.add(`${this.selector}__minus_disabled`);
    } else if (Utils.getGroupSum(itemsGroup) < maxValue) {
      itemsGroup.forEach((item) => {
        item.plus.classList.remove(`${this.selector}__plus_disabled`);
      });
    }
  }

  _updateIncrement(currentItem, itemsGroup, maxValue) {
    if (Utils.getGroupSum(itemsGroup) >= maxValue) {
      itemsGroup.forEach((item) => {
        item.plus.classList.add(`${this.selector}__plus_disabled`);
      });
    } else if (+currentItem.counter.textContent > 0) {
      currentItem.minus.classList.remove(`${this.selector}__minus_disabled`);
    }

    this._update();
  }

  _update() {
    let resultStr = '';

    this.itemsGroups.forEach((itemsGroup) => {
      const sum = Utils.getGroupSum(itemsGroup);

      if (sum > 0) {
        resultStr += `${sum} ${Utils.num2str(sum, itemsGroup[0].root.dataset.wordforms.split(', '))}, `;
      }
    });

    this._toggleCleanButton(resultStr);

    this.dropdownInput.value = resultStr
      ? `${resultStr.split('').slice(0, -2).join('')}`
      : this.dropdownInput.dataset.placeholder;

    this.dropdownInput.setAttribute('title', this.dropdownInput.value);
  }

  _toggleCleanButton(resultStr) {
    if (!this.buttons) return;

    const toggle = resultStr ? 'add' : 'remove';

    this.buttons.classList[toggle](`${this.selector}__buttons_non-empty`);
    this.dropdownClear.classList[toggle](`${this.selector}__clear-btn_non-empty`);
  }

  _handleDropdownClick() {
    this.dropdownList.classList.toggle(`${this.selector}__list_active`);
    this.dropdownOutput.classList.toggle(`${this.selector}__output_active`);
  }

  _handleOutsideClick(e) {
    const { target } = e;

    if (!this.dropdown.contains(target)) {
      this.dropdownList.classList.remove(`${this.selector}__list_active`);
      this.dropdownOutput.classList.remove(`${this.selector}__output_active`);
    }
  }

  _handleClearButtonClick() {
    this.items.forEach((item) => {
      item.counter.textContent = 0;
      item.root.dataset.value = item.counter.textContent;

      item.minus.classList.add(`${this.selector}__minus_disabled`);
      item.plus.classList.remove(`${this.selector}__plus_disabled`);
    });

    this._update();
  }
}

export default DropdownAbsolute;
