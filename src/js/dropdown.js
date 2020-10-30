//Взяты отсюда https://realadmin.ru/coding/sklonenie-na-javascript.html
function num2str(n, text_forms) {  
    n = Math.abs(n) % 100; var n1 = n % 10;
    if (n > 10 && n < 20) { return text_forms[2]; }
    if (n1 > 1 && n1 < 5) { return text_forms[1]; }
    if (n1 == 1) { return text_forms[0]; }
    return text_forms[2];
}
//Обновление текса в шапке dropDown
function updateDropdowns() {
    let dropdowns = document.querySelectorAll(".dropdown")
    dropdowns.forEach(dropdown => {
        //Если сложная шапка для dropdown в названии выводим значения из нескольких итемов
        if(dropdown.hasAttribute("several-word-forms")) {
            let result = ""
            let sum = 0
            let defaultValue = dropdown.querySelector(".dropdown__output").getAttribute("default")
            dropdown.querySelectorAll(".dropdown__item").forEach((item, i) =>{
                // Получаем все Элементы dropdown cо словоформами
                if(item.hasAttribute("wordforms")){
                    //Получаем Value
                    let elValue = item.querySelectorAll(".counter-block__counter")
                    let value
                    elValue.forEach(valueItem =>{
                        value = parseInt(valueItem.innerText)
                        sum += parseInt(valueItem.innerText)
                    })
                    //Получаем словоформу
                    if(value > 0) {
                        let wordForms = item.getAttribute("wordforms").split(", ") 
                        let rightForm = num2str(value, wordForms)
                        result += " " + value + " " + rightForm
                    }
                }
                //Пишем в заголовок дропдауна результат
                if(sum !== 0){
                    dropdown.querySelector(".dropdown__output").value = result + "..."
                }
                else {
                    dropdown.querySelector(".dropdown__output").value = defaultValue 
                }
            })
        }
        //простая форма dropdown
        else {
            //Получаем сумму всех у dropdown записываем в value
            let valuesElements = dropdown.querySelectorAll(".counter-block__counter")
            let value = 0
            valuesElements.forEach(valueItem => {
                value += (Number.parseInt(valueItem.innerText)) 
            }) 
            //Получаем словоформы и записываем в массив
            let wordForms = dropdown.hasAttribute("wordforms") ? dropdown.getAttribute("wordforms").split(", "): undefined
            let rightForm = wordForms !== undefined ? num2str(value, wordForms): ""
            //Записываем в название dropdown значение всех items
            if(value !==0) {
                dropdown.querySelector(".dropdown__output").value = value+" "+rightForm
            }
            else {
                dropdown.querySelector(".dropdown__output").value = dropdown.querySelector(".dropdown__output").getAttribute("default")
            }
        }
    })
}
document.addEventListener("DOMContentLoaded", function() {
    //Получаем все дропдауны
    let drop = document.querySelectorAll(".dropdown")
    drop.forEach((item,i) => {
        //Каждому дропдауну навешиваем событие открытия 
        let dropdownOutput = item.querySelector(".dropdown__output")
        dropdownOutput.addEventListener("click", function() {
            item.querySelector(".dropdown__list").classList.toggle("active")
        })
        //Получаем все итемы у текущего дропдауна
        let listItems = item.querySelectorAll(".dropdown__item")
        listItems.forEach(item => {
            let minus = item.querySelector(".counter-block__minus")
            let counter = item.querySelector(".counter-block__counter")
            let plus = item.querySelector(".counter-block__plus")
            minus.addEventListener("click", function() {
                if(parseInt(counter.innerText) == 1) {
                    counter.innerText = parseInt(counter.innerText) - 1
                    minus.classList.add("disabled")
                }
                else if (parseInt(counter.innerText) > 0) {
                    counter.innerText = parseInt(counter.innerText) - 1
                }
                else {
                    minus.classList.add("disabled")
                }
                updateDropdowns()
            })
            plus.addEventListener("click", function() {
                if(parseInt(counter.innerText) === 0){
                    minus.classList.remove("disabled") 
                }
                counter.innerText = parseInt(counter.innerText) + 1
                updateDropdowns()
            })
        })
        updateDropdowns()
    })
})