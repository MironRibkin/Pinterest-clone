// ====================Появление модального окна ЖАЛОБА

const modal = document.getElementById("modal-window");
const closed = document.getElementById("popup-complain__close");

export function ButtonClick() {
    modal.style.display = "block";
    unckeckAllRadio();
    checkAllRadio();
    document.querySelector("body").style.overflow = "hidden";

}


closed.onclick = function () {
    modal.style.display = "none";
    unckeckAllRadio();
    document.querySelector("body").style.overflow = "auto";
}

window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
        modal.style.cursor = "zoom-out"
        unckeckAllRadio();
        document.querySelector("body").style.overflow = "auto";

    }
}

// ================Убираем CHECK у радио кнопки
function unckeckAllRadio() {
    btn_radio.forEach((element) => {
        element.checked = false;
    });
    btn_next.classList.add('disabled');
    btn_next.classList.remove('popup-complain__next');
}


// =========================================================


// =====Активация кнопки ДАЛЕЕ в модальном окне ЖАЛОБА
const btn_next = document.getElementById('popup-complain__next');
// btn_next.disabled;
const btn_radio = document.querySelectorAll('.popup-complain__list-radio');

function checkAllRadio() {
    btn_radio.forEach((element) => {
        element.addEventListener('click', () => {
            let count = document.querySelectorAll('input:checked').length;
            if (count === 1) {
                btn_next.classList.add('popup-complain__next');
                btn_next.classList.remove('disabled');
            }
        })
    })
};



