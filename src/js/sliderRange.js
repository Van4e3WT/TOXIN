let inputLeft = document.getElementById("rangeSliderLeft");
let inputRight = document.getElementById("rangeSliderRight");
let thumbLeft = document.querySelector(".rangeslider__thumb.left");
let thumbRight = document.querySelector(".rangeslider__thumb.right");
let range = document.querySelector(".rangeslider__range");

function setLeftValue() {
    let _this = inputLeft,
        min = parseInt(_this.min),
        max = parseInt(_this.max);
    _this.value = Math.min(parseInt(_this.value), parseInt(inputRight.value) - 1000)
    let percent = ((_this.value - min) / (max - min)) * 100;
    thumbLeft.style.left = percent + "%";
    range.style.left = percent + "%";
}
function setRightValue() {
    let _this = inputRight,
        min = parseInt(_this.min),
        max = parseInt(_this.max);
    _this.value = Math.max(parseInt(_this.value), parseInt(inputLeft.value) + 1000)
    let percent = ((_this.value - min) / (max - min)) * 100;
    thumbRight.style.right = (100 - percent) + "%";
    range.style.right = (100 - percent) + "%";
}
inputLeft.addEventListener("input", setLeftValue);
inputRight.addEventListener("input", setRightValue);