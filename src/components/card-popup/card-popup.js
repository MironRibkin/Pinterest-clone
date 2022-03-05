

// ====================Появление модального окна ЖАЛОБА

const modal = document.getElementById("modal-window");
const btn = document.getElementById("btn-popup-comlpain");
const closed = document.getElementById("popup-comlpain__close");

btn.onclick = function () {
   modal.style.display = "block";
   unckeckAllRadio();
   checkAllRadio();
   
}

closed.onclick = function () {
   modal.style.display = "none";
   unckeckAllRadio();
  
   



}

window.onclick = function (event) {
   if (event.target == modal) {
       modal.style.display = "none";
       unckeckAllRadio();
   }

}


// ================Убираем CHECK у радио кнопки
function unckeckAllRadio(){
   btn_radio.forEach((element)=>{
      element.checked = false;
   });
   btn_next.classList.add('disabled');
   btn_next.classList.remove('popup-comlpain__next');
}


// =========================================================


// =====Активация кнопки ДАЛЕЕ в модальном окне ЖАЛОБА
const btn_next = document.getElementById('popup-comlpain__next');
// btn_next.disabled;
const btn_radio = document.querySelectorAll('.popup-comlpain__list-radio');

function checkAllRadio(){
btn_radio.forEach((element) => {
   element.addEventListener('click', () => {
       let count = document.querySelectorAll('input:checked').length;
       if (count === 1) { 
      btn_next.classList.add('popup-comlpain__next');
       btn_next.classList.remove('disabled');
      } 
       
   })
});

};




// ============================================================

