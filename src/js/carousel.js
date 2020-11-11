function showSlides(n, items, dots) {
    items.forEach((item, i) => {
        if(i == n) {
            item.classList.add("active")
            dots[i].classList.add("active")
        }
        else {
            item.classList.remove("active")
            dots[i].classList.remove("active")
        }
    })
}

document.addEventListener("DOMContentLoaded", () => {
    let carousels = document.querySelectorAll(".carousel")
    carousels.forEach((carousel)=>{
        let items = carousel.querySelectorAll(".carousel__item")
        let dots = carousel.querySelectorAll(".carousel__dot")
        let prevBtn = carousel.querySelector(".carousel__prev")
        let nextBtn = carousel.querySelector(".carousel__next")
        let sliderIndex = 0;
        prevBtn.addEventListener("click", () => {
            if (sliderIndex - 1 < 0)
                sliderIndex = items.length - 1
            else
                sliderIndex -= 1
            showSlides(sliderIndex, items, dots)
        })
        nextBtn.addEventListener("click", () => {
            if(sliderIndex + 1 >= items.length)
                sliderIndex = 0
            else
                sliderIndex += 1
            showSlides(sliderIndex, items, dots)
        })
        showSlides(sliderIndex, items, dots)
    })
})