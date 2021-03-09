/* global document */
function num2str(i, textForms) {
  const n = Math.abs(i) % 100;
  const n1 = n % 10;

  if (n > 10 && n < 20) return textForms[2];
  if (n1 > 1 && n1 < 5) return textForms[1];
  if (n1 === 1) return textForms[0];

  return textForms[2];
}

function updateCounterBlock(item) {
  const counter = item.querySelector('.counter-block__counter');
  const minus = item.querySelector('.counter-block__minus');

  if (+counter.textContent < 1) {
    minus.classList.add('disabled');
  } else {
    minus.classList.remove('disabled');
  }
}

function addDropdownAbsListeners() {
  const dropdowns = document.querySelectorAll('.dropdown');

  dropdowns.forEach((dropdown, i) => {
    const dropdownOutput = dropdown.querySelector('.dropdown__output');
    const dropdownClear = dropdown.querySelector('.dropdown__clear-btn');
    const dropdownApply = dropdown.querySelector('.dropdown__apply-btn');
    const dropdownList = dropdown.querySelector('.dropdown__list');

    function updateDropdowns() {
      const defaultValue = dropdownOutput.getAttribute('default');

      if (dropdown.hasAttribute('several-word-forms')) {
        const result = [];
        let sum = 0;

        dropdown.querySelectorAll('.dropdown__item').forEach((item) => {
          updateCounterBlock(item);

          if (item.hasAttribute('wordforms')) {
            const counters = item.querySelectorAll('.counter-block__counter');
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

            dropdownOutput.value = `${resultStr}\u2026`;
          } else {
            dropdownOutput.value = defaultValue;
          }
        });
      } else {
        const buttonsBlock = dropdown.querySelector('.dropdown__buttons');
        let value = 0;

        dropdown.querySelectorAll('.dropdown__item').forEach((item) => {
          updateCounterBlock(item);
          value += (+item.querySelector('.counter-block__counter').textContent);
        });

        const wordForms = dropdown.hasAttribute('wordforms') ? dropdown.getAttribute('wordforms').split(', ') : null;
        const rightForm = wordForms ? num2str(value, wordForms) : '';

        if (value !== 0) {
          dropdownOutput.value = `${value} ${rightForm}`;
          buttonsBlock.classList.add('non-empty');
        } else {
          dropdownOutput.value = defaultValue;
          buttonsBlock.classList.remove('non-empty');
        }
      }
    }

    function toggleActiveOnList() {
      dropdown.querySelector('.dropdown__list').classList.toggle('active');
    }

    function cleanListValues() {
      const counters = dropdown.querySelectorAll('.counter-block__counter');

      counters.forEach((counter) => {
        counter.textContent = 0;
      });

      updateDropdowns();
    }

    // do z-index by descending (correct view few dropdown inder each other)
    dropdownList.style.zIndex = dropdowns.length - i;

    dropdownOutput.addEventListener('click', toggleActiveOnList);

    if (dropdownClear) {
      dropdownClear.addEventListener('click', cleanListValues);
    }

    if (dropdownApply) {
      dropdownApply.addEventListener('click', toggleActiveOnList);
    }

    const listItems = dropdown.querySelectorAll('.dropdown__item');
    listItems.forEach((item) => {
      const minus = item.querySelector('.counter-block__minus');
      const counter = item.querySelector('.counter-block__counter');
      const plus = item.querySelector('.counter-block__plus');

      function decrementCounter() {
        if (+counter.textContent > 0) {
          counter.textContent = +counter.textContent - 1;
        }
        updateDropdowns();
      }

      function incrementCounter() {
        counter.textContent = +counter.textContent + 1;
        updateDropdowns();
      }

      minus.addEventListener('click', decrementCounter);
      plus.addEventListener('click', incrementCounter);
    });
    updateDropdowns();
  });
}

document.addEventListener('DOMContentLoaded', addDropdownAbsListeners);
