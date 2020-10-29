let inputLeft = document.querySelector(".rangeSliderLeft-here");
let inputRight = document.querySelector(".rangeSliderRight-here");
let thumbLeft = document.querySelector(".range-slider .slider__thumb.left");
let thumbRight = document.querySelector(".range-slider .slider__thumb.right");
let range = document.querySelector(".range-slider .slider__range");
let textMin = document.querySelector(".range-slider__min");
let textMax = document.querySelector(".range-slider__max");

function setLeftValue() {
    let _this = inputLeft,
        min = parseInt(_this.min),
        max = parseInt(_this.max);
    _this.value = Math.min(parseInt(_this.value), parseInt(inputRight.value) - 1000)
    let percent = ((_this.value - min) / (max - min)) * 100;
    thumbLeft.style.left = percent + "%";
    range.style.left = percent + "%";
    if(textMin) {
        textMin.innerHTML = _this.value;
    }
}
function setRightValue() {
    let _this = inputRight,
        min = parseInt(_this.min),
        max = parseInt(_this.max);
    _this.value = Math.max(parseInt(_this.value), parseInt(inputLeft.value) + 1000)
    let percent = ((_this.value - min) / (max - min)) * 100;
    thumbRight.style.right = (100 - percent) + "%";
    range.style.right = (100 - percent) + "%";
    if(textMax) {
        textMax.innerHTML = _this.value + "₽";
    }
}
if(inputLeft) {
    inputLeft.addEventListener("input", setLeftValue);
}
if(inputRight) {
    inputRight.addEventListener("input", setRightValue);
}