/* eslint-disable no-param-reassign */
/* global document */

import { getGroupSum, num2str } from 'Root/utils';

class DropdownAbsolute {
  constructor(dropdown, selector, zIndex = 1) {
    this.dropdown = dropdown;
    this.selector = selector;
    this.zIndex = zIndex;
    this.items = [];
    this.itemsGroups = [];
  }

  init() {
    const {
      dropdown,
      selector,
      zIndex,
      itemsGroups,
    } = this;

    this.dropdownOutput = dropdown.querySelector(`.js-${selector}__output`);
    this.dropdownList = dropdown.querySelector(`.js-${selector}__list`);

    this.dropdownInput = this.dropdownOutput.querySelector(`.js-${selector}__input`);
    this.buttons = this.dropdownList.querySelector(`.js-${selector}__buttons`);

    this._getItems();
    this._getGroupsItems();

    this.dropdownList.style.zIndex = zIndex;

    const handleInputDefaultEvents = (e) => e.preventDefault();

    this.dropdownOutput.addEventListener('click', this._handleDropdownClick.bind(this));
    document.addEventListener('mouseup', this._handleOutsideClick.bind(this));
    this.dropdownInput.addEventListener('mousedown', handleInputDefaultEvents);

    if (this.buttons) {
      this.dropdownClear = this.buttons.querySelector(`.js-${selector}__clear-btn`);
      this.dropdownApply = this.buttons.querySelector(`.js-${selector}__apply-btn`);

      this.dropdownClear.addEventListener('click', this._handleClearButtonClick.bind(this));
      this.dropdownApply.addEventListener('click', this._handleDropdownClick.bind(this));
    }

    itemsGroups.forEach((itemsGroup) => {
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
          if (getGroupSum(itemsGroup) < +itemsGroup[0].root.dataset.maxValue) {
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
    const { dropdown, selector, items } = this;
    const newItems = dropdown.querySelectorAll(`.js-${selector}__item`);

    newItems.forEach((item) => {
      const minus = item.querySelector(`.js-${selector}__minus`);
      const counter = item.querySelector(`.js-${selector}__counter`);
      const plus = item.querySelector(`.js-${selector}__plus`);

      items.push({
        root: item,
        minus,
        counter,
        plus,
      });
    });
  }

  _getGroupsItems() {
    const { items, itemsGroups } = this;

    const buffer = {
      item: items[0],
      wordforms: items[0].root.dataset.wordforms,
    };

    let bufferArray = [];

    items.forEach((item) => {
      if (buffer.wordforms === item.root.dataset.wordforms) {
        bufferArray.push(item);
      } else {
        itemsGroups.push(bufferArray);
        bufferArray = [item];
      }
    });

    itemsGroups.push(bufferArray);
  }

  _updateDecrement(currentItem, itemsGroup, maxValue) {
    const { selector } = this;

    if (+currentItem.counter.textContent < 1) {
      currentItem.minus.classList.add(`${selector}__minus_disabled`);
    } else if (getGroupSum(itemsGroup) < maxValue) {
      itemsGroup.forEach((item) => {
        item.plus.classList.remove(`${selector}__plus_disabled`);
      });
    }
  }

  _updateIncrement(currentItem, itemsGroup, maxValue) {
    const { selector } = this;

    if (getGroupSum(itemsGroup) >= maxValue) {
      itemsGroup.forEach((item) => {
        item.plus.classList.add(`${selector}__plus_disabled`);
      });
    } else if (+currentItem.counter.textContent > 0) {
      currentItem.minus.classList.remove(`${selector}__minus_disabled`);
    }

    this._update();
  }

  _update() {
    const { itemsGroups, dropdownInput } = this;
    let resultStr = '';

    itemsGroups.forEach((itemsGroup) => {
      const sum = getGroupSum(itemsGroup);

      if (sum > 0) {
        resultStr += `${sum} ${num2str(sum, itemsGroup[0].root.dataset.wordforms.split(', '))}, `;
      }
    });

    this._toggleCleanButton(resultStr);

    dropdownInput.value = resultStr
      ? `${resultStr.split('').slice(0, -2).join('')}`
      : dropdownInput.dataset.placeholder;

    dropdownInput.setAttribute('title', dropdownInput.value);
  }

  _toggleCleanButton(resultStr) {
    const { buttons, selector, dropdownClear } = this;

    if (!buttons) return;

    const toggle = resultStr ? 'add' : 'remove';

    buttons.classList[toggle](`${selector}__buttons_non-empty`);
    dropdownClear.classList[toggle](`${selector}__clear-btn_non-empty`);
  }

  _handleDropdownClick() {
    const { dropdownList, dropdownOutput, selector } = this;

    dropdownList.classList.toggle(`${selector}__list_active`);
    dropdownOutput.classList.toggle(`${selector}__output_active`);
  }

  _handleOutsideClick(e) {
    const {
      dropdown,
      dropdownList,
      dropdownOutput,
      selector,
    } = this;
    const { target } = e;

    if (!dropdown.contains(target)) {
      dropdownList.classList.remove(`${selector}__list_active`);
      dropdownOutput.classList.remove(`${selector}__output_active`);
    }
  }

  _handleClearButtonClick() {
    const { items, selector } = this;

    items.forEach((item) => {
      item.counter.textContent = 0;
      item.root.dataset.value = item.counter.textContent;

      item.minus.classList.add(`${selector}__minus_disabled`);
      item.plus.classList.remove(`${selector}__plus_disabled`);
    });

    this._update();
  }
}

export default DropdownAbsolute;
