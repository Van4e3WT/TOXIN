function num2str(n, text_forms) {
  n = Math.abs(n) % 100;
  let n1 = n % 10;

  if (n > 10 && n < 20) return text_forms[2];
  if (n1 > 1 && n1 < 5) return text_forms[1];
  if (n1 == 1) return text_forms[0];

  return text_forms[2];
}

function updateCounterBlock(item) {
  let counter = item.querySelector('.counter-block__counter');
  let minus = item.querySelector('.counter-block__minus');

  if ( parseInt(counter.innerText) < 1 ) {
    minus.classList.add('disabled');
  } else {
    minus.classList.remove('disabled');
  }
}

function updateDropdowns() {
  let dropdowns = document.querySelectorAll('.dropdown');

  dropdowns.forEach(dropdown => {
    if ( dropdown.hasAttribute('several-word-forms') ) {
      let result = [];
      let sum = 0;
      let defaultValue = dropdown.querySelector('.dropdown__output').getAttribute('default');

      dropdown.querySelectorAll('.dropdown__item').forEach( (item, i) => {
        updateCounterBlock(item);

        if ( item.hasAttribute('wordforms') ) {
          let elValue = item.querySelectorAll('.counter-block__counter');
          let value;

          elValue.forEach(valueItem => {
            value = parseInt(valueItem.innerText);
            sum += parseInt(valueItem.innerText);
          });

          if (value > 0) {
            let wordForms = item.getAttribute('wordforms').split(', ');
            let rightForm = num2str(value, wordForms);

            result.push(value + ' ' + rightForm);
          }
        }

        if (sum !== 0) {
          let resultStr = '';

          for (let i = 0; i < result.length; ++i) {
            resultStr += i?', ' + result[i]:result[i];
          }

          dropdown.querySelector('.dropdown__output').value = resultStr + '\u2026';
        } else {
          dropdown.querySelector('.dropdown__output').value = defaultValue;
        }
      });
    } else {
      let btns = dropdown.querySelector('.dropdown__buttons');
      let clearBtn = dropdown.querySelector('.dropdown__clear-btn');
      let value = 0;

      dropdown.querySelectorAll('.dropdown__item').forEach( (item, i) => {
        updateCounterBlock(item);
        value += ( parseInt( item.querySelector('.counter-block__counter').innerText ) );
      });

      let wordForms = dropdown.hasAttribute('wordforms') ? dropdown.getAttribute('wordforms').split(', '): undefined;
      let rightForm = wordForms !== undefined ? num2str(value, wordForms): '';

      if (value !==0) {
        dropdown.querySelector('.dropdown__output').value = value + ' ' + rightForm;
        btns.style.justifyContent = 'space-between';
        clearBtn.style.display = 'block';
      } else {
        dropdown.querySelector('.dropdown__output').value = dropdown.querySelector('.dropdown__output').getAttribute('default');
        btns.style.justifyContent = 'flex-end';
        clearBtn.style.display = 'none';
      }
    }
  });
}
document.addEventListener('DOMContentLoaded', function() {
  //Получаем все дропдауны
  let drop = document.querySelectorAll('.dropdown');

  drop.forEach( (item,i) => {
    //Каждому дропдауну навешиваем событие открытия и кнопок списка
    let dropdownOutput = item.querySelector('.dropdown__output');
    let dropdownClear = item.querySelector('.dropdown__clear-btn');
    let dropdownApply = item.querySelector('.dropdown__apply-btn');
    let dropdownList = item.querySelector('.dropdown__list');

    // задаем z-index по убыванию, дабы корректно отображать несколько дропдаунов друг под другом
    dropdownList.style.zIndex = drop.length - i;
    dropdownOutput.addEventListener('click', function() {
      item.querySelector('.dropdown__list').classList.toggle('active');
    });

    if (dropdownClear) {
      dropdownClear.addEventListener('click', function() {
        let counters = item.querySelectorAll('.counter-block__counter');

        counters.forEach(counter => {
          counter.innerText = 0
        });
        updateDropdowns();
      });
    }

    if (dropdownApply) {
      dropdownApply.addEventListener('click', function() {
        item.querySelector('.dropdown__list').classList.remove('active');
      });
    }

    //Получаем все айтемы у текущего дропдауна
    let listItems = item.querySelectorAll('.dropdown__item');
    listItems.forEach(item => {
      // Для каждого айтема
      let minus = item.querySelector('.counter-block__minus');
      let counter = item.querySelector('.counter-block__counter');
      let plus = item.querySelector('.counter-block__plus');

      minus.addEventListener('click', function() {
        if (parseInt(counter.innerText) > 0) {
          counter.innerText = parseInt(counter.innerText) - 1;
        }
        updateDropdowns();
      });

      plus.addEventListener('click', function() {
        counter.innerText = parseInt(counter.innerText) + 1;
        updateDropdowns();
      });
    });
    updateDropdowns();
  });
});