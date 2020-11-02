document.addEventListener("DOMContentLoaded", () => {
    // поиск всех дропдаунов
    let drops = document.querySelectorAll(".dropdown-checkbox")
    drops.forEach(item => {
        // добавление событий на каждый дропдаун
        item.addEventListener("click", () => {
            item.querySelector(".dropdown-checkbox__title").classList.toggle("active")
        })
    })
})